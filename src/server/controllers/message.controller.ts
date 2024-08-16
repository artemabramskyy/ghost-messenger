import type { Request, Response, NextFunction } from 'express';

// Services
import { sendMessageService } from '../services';

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.params;

    res.json(await sendMessageService({ message }));
  } catch (error) {
    next(error);
  }
};
