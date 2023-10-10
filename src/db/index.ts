import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from 'pg';

import * as schema from './schema';

const { Pool } = pg;

const config : any = {
  connectionString: `postgres://${process.env.DB_USER || "postgres"}:${process.env.DB_PASS}@${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || "5432"}/${process.env.DB_NAME || "chess"}${process.env.DB_SSLMODE ? '?sslmode=require' : ''}`,
}

if (process.env.DB_SSLMODE) {
  config.ssl = {
    rejectUnauthorized: false
  };
}
 
const client = new Pool(config);

const db = drizzle(client, { schema });

console.log('Conncting to database...');
// client.connect().then(() => {
  // console.log('Database connected!');
  console.log("Run migrations...");
  migrate(db, { migrationsFolder: "migrations" }).then(() =>{
    console.log("Migrations applied!")
  });
// });

export default db;
