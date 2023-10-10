import 'dotenv/config'
import type { Config } from "drizzle-kit";
 
export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: 'pg',
  dbCredentials: {
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "chess",
  }
} satisfies Config;