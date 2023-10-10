import { Response } from 'express';
import { sql, eq} from 'drizzle-orm';

import { io } from './core';
import RequestWithUser from './interfaces/requestWithUser.type';
import CreateGame from './interfaces/createGame.runtype';
import MakeMove from './interfaces/makeMove.runtype';
import db from './db';
import * as schema from './db/schema';
import { createGame, getGameById, getTurnSide, makeMove, isGameOver, isDraw } from './utils/chess';
import bot, { getNewGameText, getJoinGameText, getMoveGameText, getFinishGameText } from './bot';


export async function get_game(req: RequestWithUser, res: Response) {
  const game_id = parseInt(req.params.id);
  if (!game_id) return res.sendStatus(404);
  const game = await getGameById(game_id);
  if (!game) return res.sendStatus(404);
  return res.send(game);
}

export async function create_game(req: RequestWithUser, res: Response) {
  try {
    const cg = CreateGame.check(req.body);
    const game = await createGame(req.user?.id!, cg.side);
    if (req.user?.allowsWriteToPm) {
      bot.telegram.sendMessage(String(req.user.id), getNewGameText(game?.id!))
    }
    res.status(200).send(game);
  } catch (e) {
    return res.status(400).send(e);
  }
}

export async function join_game(req: RequestWithUser, res: Response) {
  const game_id = parseInt(req.params.id);
  if (!game_id) return res.sendStatus(404);
  
  const game = await getGameById(game_id);
  if (!game) return res.sendStatus(404);
  
  if (!req.user?.id) return res.sendStatus(400);

  if ((game.black && game.white) || game.startAt || game.black?.id === req.user.id || game.white?.id === req.user.id) {
    return res.sendStatus(400);
  }

  const update_fields = game.white ? {blackUserId: req.user.id} : {whiteUserId: req.user.id};

  await db.update(schema.chessGame).set({
    ...update_fields,
    updatedAt: sql`now()`,
    startAt: sql`now()`
  }).where(eq(schema.chessGame.id, game.id));

  const updatedGame = await getGameById(game.id);
  const userIdToReply = game.white ? game.white.id : game.black?.id;

  try {
    bot.telegram.sendMessage(String(userIdToReply), getJoinGameText(game.id));
  } catch {
    console.log("Error on bot send to", userIdToReply);
  }

  io.emit(`chess_${game.id}`, updatedGame);
  return res.status(200).send(updatedGame);
}

export async function make_move(req: RequestWithUser, res: Response) {
  const game_id = parseInt(req.params.id);
  if (!game_id) return res.sendStatus(404);

  if (!req.user?.id) return res.sendStatus(400);

  try {
    const move = MakeMove.check(req.body);
    const game = await getGameById(game_id);
    if (!game) return res.sendStatus(404);

    if (!game.startAt || game.endAt) {
      // Game already ended or not started
      return res.sendStatus(400);
    }

    const turnSide = getTurnSide(game.board!);
    if ((turnSide === 'w' && game.white?.id !== req.user.id) || (turnSide === 'b' && game.black?.id !== req.user.id)) {
      // It is not your game
      return res.sendStatus(400);
    }

    const newBoard = makeMove(game.board!, move);
    if (!newBoard) {
      // Wrong move
      return res.sendStatus(400);
    }

    const update_fields = {
      board: newBoard,
      updatedAt: sql`now()`,
      endAt: isGameOver(newBoard) ? sql`now()` : null
    };

    await db.update(schema.chessGame).set(update_fields).where(eq(schema.chessGame.id, game.id));
    const updatedGame = await getGameById(game.id);

    const userIdToReply = turnSide === 'b' ? game.white?.id : game.black?.id;

    try {
      if (updatedGame?.endAt) {
        const draw = isDraw(newBoard);
        const winnerId = turnSide === 'w' ? game.white?.id : game.black?.id;
        const looserId = turnSide === 'b' ? game.white?.id : game.black?.id;
        bot.telegram.sendMessage(String(winnerId), getFinishGameText(game.id, draw ? 'Draw!' : 'You\'re a winner!'));
        bot.telegram.sendMessage(String(looserId), getFinishGameText(game.id, draw ? 'Draw!' : 'You lost!'));
      } else {
        bot.telegram.sendMessage(String(userIdToReply), getMoveGameText(game.id));
      }
    } catch {
      console.log("Error on bot send to", userIdToReply);
    }  

    io.emit(`chess_${game.id}`, updatedGame);

    res.status(200).send(updatedGame);
  } catch (e) {
    return res.status(400).send(e);
  }
}
