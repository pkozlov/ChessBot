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

- [PostgreSQL database](https://www.postgresql.org) version >= 14
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

## Production Deployment

To deploy the compiled backend and frontend, you can use any server of your choice. Follow these common steps to set up a production server:

1. Build the Mini App frontend by running `npm run build`. This will generate the frontend files in the `build` folder.
2. Build the Mini App backend server by running `npm run build-server`. This will create the `server-build` directory.
3. To start the backend server, ensure you have the `node_modules` folder with all the required dependencies installed. Then, run `node server-build/index.js` (default port: `3000`). You may consider using a server process manager like `supervisor` or `pm2` for improved server management. Don't forget to configure the necessary environment variables.
4. By default, the backend server will serve static files from the `build` folder. However, it is recommended to use a dedicated web server like `nginx` to handle static files and proxy API calls. You can find an example of an nginx configuration in the Helm ConfigMap [here](https://github.com/pkozlov/ChessBot/blob/main/.helm/templates/configmaps/nginx.yaml).
5. Ensure the security of your web server by implementing HTTPS. You can use services like [Let's Encrypt](https://letsencrypt.org/) or [Cloudflare](https://www.cloudflare.com) for this purpose.
6. Configure your Bot and Mini App with [@BotFather](https://t.me/BotFather). For more information, refer to the [official documentation](https://core.telegram.org/bots/webapps).
7. Share your bot with friends and enjoy playing chess!

## Production deployment to Kubernetes with werf

[@ChessContestBot](https://t.me/ChessContestBot) is deployed in Kubernetes using [werf](https://werf.io/)

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
