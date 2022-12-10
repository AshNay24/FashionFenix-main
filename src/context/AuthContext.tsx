/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createContext } from 'react';

import { ILoggin, IRegister, IReloadUser } from '../interface/auth.interface';
import { IState } from '../interface/authState';

interface IAuthState {
  auth: IState;
  loggin: (user: ILoggin) => Promise<any>;
  signUp: (user: IRegister) => Promise<any>;
  refreshToken: (user: IReloadUser | null) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthState);
