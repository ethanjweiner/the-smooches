import { UserData } from './types';

declare global {
  namespace Express {
    export interface Request {
      token?: string | null;
      user?: Omit<UserData, 'token'> | null;
    }
  }
}
