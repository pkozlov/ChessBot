# Chess game bot and Mini App for Telegram

[@ChessContestBot](https://t.me/ChessContestBot) – a Mini App that provides multiplayer chess game. User can select side and create new game and share provided link to game with opponent. When opponent join the game user will recieve notifications from bot about game moves. Every telegram user who have link to the game can see competition online.

This project was created for [Telegram Mini App Contest](https://t.me/contest/327).

## Environment

For local development or production build you need to define environment variables (also you can use `.env` file at project root):

- `REACT_APP_BOT_URI` URL to your Telegram Mini App without protocol. Example: `t.me/ChessContestBot/game`
- `WEBHOOK_DOMAIN` Domain where your Mini App deployed. Example: `chessbot.kozlov.cloud`
- `TELEGRAM_BOT_TOKEN` Token for your Telegram bot provided by [@BotFather](https://t.me/BotFather)
- `DB_HOST` Host of PostgreSQL database
- `DB_PORT` Port of PostgreSQL database
- `DB_USER` User of PostgreSQL database
- `DB_PASS` Password for PostgreSQL database
- `DB_NAME` Name of PostgreSQL database

Example of `.env` file:

```
REACT_APP_BOT_URI=t.me/ChessContestBot/game
WEBHOOK_DOMAIN=chessbot.kozlov.cloud
TELEGRAM_BOT_TOKEN=super:secret-bot-token
DB_HOST=localhost
DB_PORT=5432
DB_USER=chess
DB_PASS=chess
DB_NAME=chess
```

## Installation

1. To build and run Mini App server local you need to have installed:

- [PostgreSQL database](https://www.postgresql.org) version >= 15
- [Node.js](https://nodejs.org/) version >= 18

2. In project root with configured environment run:

`npm install`

3. Build Mini App frontend:

`npm run build`

4. Start development server on port `3000`:

`npm run server`

Database migrations will be applied at every server run.
To expose local server with publicly available https endpoint you can use [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) or [ngrok](https://ngrok.com).

## Available commands

- `npm run build` Builds frontend for Mini App to folder `build`
- `npm run build-server` Create production server build to folder `server-build`
- `npm run start` Starts development server with only frontend
- `npm run server` Starts development server with API, websocket, bot webhook register and frontend static files serving on port `3000`
- `npm run makemigrations` Create migration with database changes
- `npm run studio` Run server with [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) to manage database

## TODO

- Unit tests
- Translations to other languages
- List of your games
- History of game moves with possibility to go backward and forward
- Logging and tracing

Feel free to make PR

## Author

Copyright (c) 2023 [Pavel Kozlov](https://pkozlov.com/)

MIT License
