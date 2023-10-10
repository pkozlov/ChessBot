import { pgTable, index, foreignKey, serial, bigint, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const chessGame = pgTable("chess_game", {
	id: serial("id").primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	whiteUserId: bigint("white_user_id", { mode: "number" }).references(() => user.id),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	blackUserId: bigint("black_user_id", { mode: "number" }).references(() => user.id),
	board: text("board"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	createdByUserId: bigint("created_by_user_id", { mode: "number" }).references(() => user.id),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	updatedByUserId: bigint("updated_by_user_id", { mode: "number" }).references(() => user.id),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	startAt: timestamp("start_at", { mode: 'string' }),
	endAt: timestamp("end_at", { mode: 'string' }),
},
(table) => {
	return {
		createdAtIdx: index("created_at_idx").on(table.createdAt),
	}
});

export const user = pgTable("user", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	username: varchar("username", { length: 256 }),
	firstName: varchar("first_name", { length: 256 }),
	lastName: varchar("last_name", { length: 256 }),
	languageCode: varchar("language_code", { length: 10 }),
	isPremium: boolean("is_premium"),
	allowsWriteToPm: boolean("allows_write_to_pm"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});