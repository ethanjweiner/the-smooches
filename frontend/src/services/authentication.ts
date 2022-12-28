import axios from 'axios';
import { UserData } from '../types';

const login = async (
  usernameInput: string,
  passwordInput: string
): Promise<UserData> => {
  const response = await axios.post('/api/login', {
    username: usernameInput,
    password: passwordInput,
  });

  const userData: UserData = response.data;
  return userData;
};

export default { login };
