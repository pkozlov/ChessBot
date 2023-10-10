import { migrate } from "drizzle-orm/node-postgres/migrator";

import { app, httpServer, io } from "./core";
import bot from './bot';
import db from "./db";
import { get_game, create_game, join_game, make_move } from "./api";
import authMiddleware from "./utils/authMiddleware";

console.log("Run migrations...");
await migrate(db, { migrationsFolder: "migrations" });

// Set API routes
app.use("/api", authMiddleware);

app.post('/api/game/:id/move/', make_move); // Make move
app.post('/api/game/:id/join/', join_game); // Join and start game
app.get('/api/game/:id/', get_game); // Get game by id
app.post('/api/game/', create_game); // Create game

// Set the bot API endpoint
app.use(await bot.createWebhook({ domain: process.env.WEBHOOK_DOMAIN || "localhost" }));

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000, () => console.log("Listening on port", 3000));

// app.listen(3000, () => console.log("Listening on port", 3000));
