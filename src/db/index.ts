import { drizzle } from "drizzle-orm/node-postgres";
import pg from 'pg';

import * as schema from './schema';

const { Client } = pg;
 
const client = new Client({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "chess",
});
 
await client.connect();
const db = drizzle(client, { schema });

export default db;
