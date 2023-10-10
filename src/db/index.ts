import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
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

const db = drizzle(client, { schema });

console.log('Conncting to database...');
client.connect().then(() => {
  console.log('Database connected!');
  console.log("Run migrations...");
  migrate(db, { migrationsFolder: "migrations" }).then(() =>{
    console.log("Migrations applied!")
  });
});

export default db;
