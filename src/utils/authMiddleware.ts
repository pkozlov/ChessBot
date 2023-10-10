import { Response, NextFunction } from "express";

import RequestWithUser from "../interfaces/requestWithUser.type";
import validateInitData from './validateInitData';
import createOrUpdateUser from "./createOrUpdateUser";


export default async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  const initDataHeader = req.headers["tg-init-data"] as string || "";

  const initData = new URLSearchParams(initDataHeader);

  if (!(await validateInitData(initData, process.env.TELEGRAM_BOT_TOKEN!))) {
    return res.sendStatus(403);
  }

  const userDataRaw = JSON.parse(initData.get("user") || "{}")
  const user = await createOrUpdateUser(userDataRaw);
  
  req.user = user;
  next();
}
