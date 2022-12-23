import { Router } from 'express';
const LoginRouter = Router();
require('express-async-errors');
import jwt from 'jsonwebtoken';
import config from '../utils/config';

interface LoginDetails {
  username: string;
  password: string;
}

// TODO: Allow non-admin users
const isValidUser = (username: string, password: string): boolean => {
  return (
    username === config.ADMIN_USERNAME && password === config.ADMIN_PASSWORD
  );
};

LoginRouter.post('/', async (req, res) => {
  console.log(req.body);

  const { username, password }: LoginDetails = req.body;

  if (!isValidUser(username, password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const userData = {
    username,
  };

  if (!config.JWT_SECRET) {
    return res.status(500).json({ error: 'No secret configured' });
  }

  const token = jwt.sign(userData, config.JWT_SECRET);
  return res.status(200).json({
    token,
    username,
  });
});

export default LoginRouter;
