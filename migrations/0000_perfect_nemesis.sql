CREATE TABLE IF NOT EXISTS "chess_game" (
	"id" serial PRIMARY KEY NOT NULL,
	"white_user_id" bigint,
	"black_user_id" bigint,
	"board" text,
	"created_by_user_id" bigint,
	"created_at" timestamp DEFAULT now(),
	"updated_by_user_id" bigint,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" bigint PRIMARY KEY NOT NULL,
	"username" varchar(256),
	"first_name" varchar(256),
	"last_name" varchar(256),
	"language_code" varchar(10),
	"is_premium" boolean,
	"allows_write_to_pm" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "chess_game" ("created_at");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chess_game" ADD CONSTRAINT "chess_game_white_user_id_user_id_fk" FOREIGN KEY ("white_user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chess_game" ADD CONSTRAINT "chess_game_black_user_id_user_id_fk" FOREIGN KEY ("black_user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chess_game" ADD CONSTRAINT "chess_game_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chess_game" ADD CONSTRAINT "chess_game_updated_by_user_id_user_id_fk" FOREIGN KEY ("updated_by_user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
