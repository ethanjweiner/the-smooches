import { Router } from 'express';
const LoginRouter = Router();
import jwt from 'jsonwebtoken';
import { UserData, LoginDetails } from '../types/types';
import config from '../utils/config';

const isValidUser = (username: string, password: string): boolean => {
  return (
    username === config.ADMIN_USERNAME && password === config.ADMIN_PASSWORD
  );
};

LoginRouter.post('/', async (req, res) => {
  const { username, password }: LoginDetails = req.body;

  if (!isValidUser(username, password)) {
    throw Error('invalid credentials');
  }

  const userData: Omit<UserData, 'token'> = {
    username,
  };

  const token = jwt.sign(userData, config.JWT_SECRET || '');

  return res.status(200).json({
    token,
    username,
  });
});

export default LoginRouter;
