import type {Request, Response, NextFunction} from 'express';

import {createChat} from '../services';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {sender, receiver} = req.body;

    res.json(createChat({sender, receiver}, res));
  } catch (error) {
    next(error);
  }
};
