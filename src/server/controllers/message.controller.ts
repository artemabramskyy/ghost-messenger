import type { Request, Response, NextFunction } from 'express';

import { sendMessageService } from '../services';

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, chatMeta } = req.body;

    res.json(sendMessageService({ message }));
  } catch (error) {
    next(error);
  }
};
