import 'dotenv/config'
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: `postgres://${process.env.DB_USER || "postgres"}:${process.env.DB_PASS}@${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || "5432"}/${process.env.DB_NAME || "chess"}${process.env.DB_SSLMODE ? '?ssl={"rejectUnauthorized":false}' : ''}`
  }
} satisfies Config;