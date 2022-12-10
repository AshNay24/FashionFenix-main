// const initialState = {
//   checking: true,
//   //   name: null,
//   //   uid: null,
// };

import { IAction } from '../../interface/actions';
import { IState } from '../../interface/authState';
import { types } from '../types/types';
import { authCases } from './authCases';

const INITIAL_STATE: IState = {
  cheking: false,
  username: null,
  uid: null,
};

export const authReducer = (
  state: IState = INITIAL_STATE,
  action: IAction,
): IState => {
  switch (action.type) {
    case types.authLogin:
      return authCases.authLogin(state, action);
    case types.authStartLogin:
      return authCases.authStartLogin(state, action);

    case types.authFinishChecking:
      return authCases.authFinishcheking(state);

    case types.authLogout:
      return authCases.authLogout(state);

    default:
      return state;
  }
};
