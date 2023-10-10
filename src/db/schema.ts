import { boolean, timestamp, bigint, pgTable, text, serial, index, varchar } from 'drizzle-orm/pg-core';

Object.defineProperty(BigInt.prototype, "toJSON", {
  get() {
      "use strict";
      return () => String(this);
  }
});

export const user = pgTable('user', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  username: varchar('username', { length: 256 }),
  firstName: varchar('first_name', { length: 256 }),
  lastName: varchar('last_name', { length: 256 }),
  languageCode: varchar('language_code', { length: 10 }),
  isPremium: boolean('is_premium'),
  allowsWriteToPm: boolean('allows_write_to_pm'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
});

export const chessGame = pgTable('chess_game', {
  id: serial('id').primaryKey(),
  whiteUserId: bigint('white_user_id', { mode: 'bigint' }).references(() => user.id),
  blackUserId: bigint('black_user_id', { mode: 'bigint' }).references(() => user.id),
  
  board: text('board'),

  createdByUserId: bigint('created_by_user_id', { mode: 'bigint' }).references(() => user.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedByUserId: bigint('updated_by_user_id', { mode: 'bigint' }).references(() => user.id),
  updatedAt: timestamp('updated_at'),
  startAt: timestamp('start_at'),
  endAt: timestamp('end_at'),
}, (game) => {
  return {
    createdAtIdx: index("created_at_idx").on(game.createdAt),
  }
});
