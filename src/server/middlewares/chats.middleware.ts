import type { Request, Response, NextFunction } from 'express';
import type { Chat } from '../interfaces';

export const chatsMiddleware =
  (CHATS_INSTANCES: Chat[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    res.locals.CHATS_INSTANCES = CHATS_INSTANCES;
    next();
  };
