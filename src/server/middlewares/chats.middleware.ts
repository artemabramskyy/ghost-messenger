import type { Request, Response, NextFunction } from 'express';
import {ChatMap} from "root/src/interfaces/Chat";

export const chatsMiddleware =
  (CHATS_INSTANCES: ChatMap) =>
  (req: Request, res: Response, next: NextFunction) => {
    res.locals.CHATS_INSTANCES = CHATS_INSTANCES;
    next();
  };
