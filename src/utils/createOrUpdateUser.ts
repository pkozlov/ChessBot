import { sql } from "drizzle-orm";

import db from '../db';
import * as schema from '../db/schema';

type Params = {
  id: bigint | number,
  is_bot?: boolean | null | undefined,
  first_name: string | null | undefined,
  last_name?: string | null | undefined,
  username?: string | null | undefined,
  language_code?: string | null | undefined,
  is_premium?: boolean | null | undefined,
  allows_write_to_pm?: boolean | null | undefined
}

const createOrUpdateUser = async (userDataRaw: Params) => {
  const telegramUserId = BigInt(userDataRaw.id);
  const userData = {
    username: userDataRaw.username,
    firstName: userDataRaw.first_name,
    lastName: userDataRaw.last_name,
    languageCode: userDataRaw.language_code,
    isPremium: userDataRaw.is_premium,
    allowsWriteToPm: userDataRaw.allows_write_to_pm,
    updatedAt: sql`now()`
  };

  const user = (await db.insert(schema.user)
    .values({ id: telegramUserId, ...userData })
    .onConflictDoUpdate({ target: schema.user.id, set: userData })
    .returning())[0];
  
  return user;
}

export default createOrUpdateUser;
