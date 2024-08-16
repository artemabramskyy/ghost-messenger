import type { Request, Response, NextFunction } from 'express';

// Services
import { sendMessegeService } from '../services';

export const sendMessege = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { messege } = req.params;

    res.json(await sendMessegeService({ messege }));
  } catch (error) {
    next(error);
  }
};
