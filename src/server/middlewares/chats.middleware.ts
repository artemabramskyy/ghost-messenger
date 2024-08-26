import type { Request, Response, NextFunction } from 'express';
import {ChatMap} from "root/src/interfaces/Chat";
import {ClientMap} from "root/src/interfaces/Client";

export const chatsMiddleware =
  (CHATS_INSTANCES: ChatMap, CLIENTS: ClientMap) =>
  (req: Request, res: Response, next: NextFunction) => {
    res.locals.CHATS_INSTANCES = CHATS_INSTANCES;
    res.locals.CLIENTS = CLIENTS;
    next();
  };
