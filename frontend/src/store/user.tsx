import React, { createContext, useContext, useReducer } from 'react';
import { Action, UserData } from '../types';
import authService from '../services/authentication';
import { setToken } from '../services/images';

type UserAction = SetUserAction | DeleteUserAction;

interface SetUserAction {
  type: Action.SET;
  payload: UserData;
}

interface DeleteUserAction {
  type: Action.DELETE;
}

interface State {
  user: UserData | null;
}

const initialState: State = {
  user: null,
};

function reducer(state: State, action: UserAction): State {
  switch (action.type) {
    case Action.SET:
      return { ...state, user: action.payload };
    case Action.DELETE:
      return { ...state, user: null };
    default:
      return state;
  }
}

interface UserContextInterface extends State {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => void;
}

const UserContext = createContext<UserContextInterface | null>(null);

export const useActiveUser = (): UserContextInterface => {
  const contextValue = useContext(UserContext);

  if (!contextValue) {
    throw Error('User context unavailable');
  }

  return contextValue;
};

function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    user: state.user,
    login: async (username: string, password: string) => {
      const user = await authService.login(username, password);
      localStorage.setItem('user_data', JSON.stringify(user));
      setToken(user.token);
      dispatch({ type: Action.SET, payload: user });
    },
    loadUser: () => {
      const savedUserJSON = localStorage.getItem('user_data');

      if (savedUserJSON) {
        const user: UserData = JSON.parse(savedUserJSON);
        setToken(user.token);
        dispatch({ type: Action.SET, payload: user });
      }
    },
    logout: () => {
      localStorage.removeItem('user_data');
      dispatch({ type: Action.DELETE });
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
