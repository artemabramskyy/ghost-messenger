import type { Request, Response, NextFunction } from 'express';

import { createChatService } from '../services';

export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sender, receiver } = req.body;

    res.json(createChatService({ sender, receiver }, res));
  } catch (error) {
    next(error);
  }
};
