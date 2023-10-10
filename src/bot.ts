import 'dotenv/config'
import { Telegraf, Markup, Context } from "telegraf";
// import { message } from 'telegraf/filters';
import { createGame } from './utils/chess';
import createOrUpdateUser from './utils/createOrUpdateUser';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || "");

bot.command('start', ctx => {
  ctx.reply("Welcome!\nHere you can play chess.\nJust create new game with commands /newgame, /newwhite, /newblack or with t.me/ChessContestBot/game.\nShare link to the game with your opponent and play chess!",
  Markup.keyboard([
    Markup.button.callback("/newgame", "/newgame"),
    Markup.button.callback("/newwhite", "/newwhite"),
    Markup.button.callback("/newblack", "/newblack")
  ]).persistent().resize());
});

export function getJoinGameText(game_id: number) {
  return `Game ${process.env.REACT_APP_BOT_URI}?startapp=chess_${game_id}\nOpponent joined the game. Game started!`;
}

export function getMoveGameText(game_id: number) {
  return `Game ${process.env.REACT_APP_BOT_URI}?startapp=chess_${game_id}\nThe opponent made a move, waiting for you...`;
}

export function getFinishGameText(game_id: number, finish: string) {
  return `Game ${process.env.REACT_APP_BOT_URI}?startapp=chess_${game_id}\nGame over! ${finish}`;
}



export function getNewGameText(game_id: number) {
  return `New game ${process.env.REACT_APP_BOT_URI}?startapp=chess_${game_id}\nShare this link with your opponent, whoever joins first will start the game.`;
}

function replyWithNewGame(ctx: Context, game_id: number) {
  const text = getNewGameText(game_id);
  ctx.reply(text);
}

bot.command('newgame', ctx => {
  createOrUpdateUser(ctx.message.from).then((user) => {
    createGame(user.id, 'random').then((game) => {
      if (game) replyWithNewGame(ctx, game.id);
    });
  });
});

bot.command('newwhite', ctx => {
  createOrUpdateUser(ctx.message.from).then((user) => {
    createGame(user.id, 'white').then((game) => {
      if (game) replyWithNewGame(ctx, game.id);
    });
  });
});

bot.command('newblack', ctx => {
  createOrUpdateUser(ctx.message.from).then((user) => {
    createGame(user.id, 'black').then((game) => {
      if (game) replyWithNewGame(ctx, game.id);
    });
  });
});


export default bot;
