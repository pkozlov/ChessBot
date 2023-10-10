import { Chess } from 'chess.js'
import { eq, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

import db from '../db';
import * as schema from '../db/schema';


export function newBoard(): string {
  const chess = new Chess();
  return chess.fen();
}

export async function createGame(user_id: bigint, side: 'black' | 'white' | 'random') {
  const data: any = {
    board: newBoard(),
    createdByUserId: user_id,
    updatedAt: sql`now()`,
    updatedByUserId: user_id
  };

  const selectedSide = side === 'random' ? (Math.random() < 0.5 ? 'white' : 'black'): side;

  if (selectedSide === 'white') {
    data['whiteUserId'] = user_id;
  } else {
    data['blackUserId'] = user_id;
  }

  const result = await db.insert(schema.chessGame).values(data).returning({ insertedId: schema.chessGame.id });
  return await getGameById(result[0].insertedId);
}

export async function getGameById(game_id: number) {
  const white = alias(schema.user, "white");
  const black = alias(schema.user, "black");
  const games = await db.select({
    id: schema.chessGame.id,
    board: schema.chessGame.board,
    white: {
      id: white.id,
      firstName: white.firstName,
      lastName: white.lastName,
      username: white.username
    },
    black: {
      id: black.id,
      firstName: black.firstName,
      lastName: black.lastName,
      username: black.username
    },
    startAt: schema.chessGame.startAt,
    endAt: schema.chessGame.endAt
  }).from(schema.chessGame)
    .leftJoin(white, eq(white.id, schema.chessGame.whiteUserId))
    .leftJoin(black, eq(black.id, schema.chessGame.blackUserId))
    .where(eq(schema.chessGame.id, game_id))

  if (games.length === 0) {
    return null;
  } else {
    return games[0];
  }
}

export function getTurnSide(fen: string) {
  const chess = new Chess(fen);
  return chess.turn().toString();
}

export function makeMove(fen: string, move: {from: string, to: string}) {
  const chess = new Chess(fen);
  const result = chess.move({...move, promotion: "q"});
  if (!result) return null;
  return result.after;
}

export function isGameOver(fen: string) {
  const chess = new Chess(fen);
  return chess.isGameOver();
}

export function isDraw(fen: string) {
  const chess = new Chess(fen);
  return chess.isDraw();
}
