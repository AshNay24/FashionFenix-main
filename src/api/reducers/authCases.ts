import { IAction } from '../../interface/actions';
import { IState } from '../../interface/authState';

const authLogin = (state: IState, action: IAction): IState => ({
  ...action.payload,
  cheking: true,
});

const authStartLogin = (state: IState, action: IAction): IState => ({
  ...state,
  ...action.payload,
  cheking: true,
});

const authFinishcheking = (state: IState): IState => ({
  cheking: true,
  displayName: null,
  email: null,
  photoURL: null,
  uid: null,
});

const authLogout = (state: IState): IState => ({
  cheking: true,
  displayName: null,
  email: null,
  photoURL: null,
  uid: null,
});

export const authCases = {
  authLogin,
  authStartLogin,
  authFinishcheking,
  authLogout,
};
