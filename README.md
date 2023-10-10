# Chess game bot and Mini App for Telegram

[@ChessContestBot](https://t.me/ChessContestBot) is a Mini App designed to offer a multiplayer chess gaming experience. Users have the option to choose their side and create a new game, after which they can share the provided game link with their opponent. When the opponent joins the game, the user will receive notifications from the bot regarding the game's progress. Every Telegram user with access to the game link can view the ongoing competition in real-time.

This project was created for [Telegram Mini App Contest](https://t.me/contest/327).

## Environment

To facilitate local development or production builds, you must define environment variables. You can also utilize a `.env` file located at the project's root directory:

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

To build and run the Mini App server locally, you need to have the following installed:

- [PostgreSQL database](https://www.postgresql.org) (version >= 14)
- [Node.js](https://nodejs.org/) (version >= 18)

Follow these steps for installation:

1. In the project root directory, with your environment properly configured, run the following command to install project dependencies:

`npm install`

2. Build the Mini App frontend by executing:

`npm run build`

3. Start the development server on port `3000` with the following command:

`npm run server`

Database migrations will be automatically applied every time the server is started.

To expose your local server with a publicly available HTTPS endpoint, you can use either [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) or [ngrok](https://ngrok.com).

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

Also we have working `Dockerfile` with frontend and backend images.

## Production deployment to Kubernetes with werf

[@ChessContestBot](https://t.me/ChessContestBot) is deployed in Kubernetes using [werf](https://werf.io/).

You can find configuration in `.helm` folder and `werf.yaml` file.

Set environment for Kubernetes config, like ``

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
