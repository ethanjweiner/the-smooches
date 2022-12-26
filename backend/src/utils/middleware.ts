// Middleware for loading incoming JWT & token

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from './config';

export const loadToken = (req: Request, _: Response, next: NextFunction) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }

  next();
};

export const loadUser = (req: Request, _: Response, next: NextFunction) => {
  if (!req.token || !config.JWT_SECRET) {
    req.user = null;
    next();
    return;
  }

  const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

  if (typeof decodedToken == 'string' || !decodedToken.username) {
    req.user = null;
    next();
    return;
  }

  req.user = {
    username: decodedToken.username,
  };

  next();
};
