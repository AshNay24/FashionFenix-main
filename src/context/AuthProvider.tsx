import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import React, { useReducer } from 'react';

import { authReducer } from '../api/reducers/authReducer';
import { types } from '../api/types/types';
import { ILoggin, IRegister, IReloadUser } from '../interface/auth.interface';
import { IState } from '../interface/authState';
import { firebaseAuth } from '../libs/firebase-config';
import { AuthContext } from './AuthContext';

const errorMessages = ['auth/wrong-password', 'auth/user-not-found'];
const INITIAL_STATE: IState = {
  cheking: false,
  displayName: null,
  email: null,
  photoURL: null,
  uid: null,
};
// interface IUserModel {
//   id: string;
//   username: string;
//   email: string;
//   active: boolean;
//   isRegisteredWithGoogle: boolean;
// }

// interface IGetUser {
//   user: IUserModel;
//   jwt: {
//     accessToken: string;
//   };
// }
export const AuthProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const loggin = async (loginData: ILoggin) => {
    const auth = firebaseAuth;
    const errorMessage = await signInWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password,
    )
      .then((userCredential) => {
        const { displayName, email, photoURL, uid } = userCredential.user;

        const payload = {
          displayName,
          email,
          photoURL,
          uid,
        };
        dispatch({ type: types.authLogin, payload });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorMessages.includes(errorCode)) {
          return 'Credenciales invalidas';
        }
      });
    return errorMessage;
  };
  const refreshToken = (user: IReloadUser | null) => {
    if (user !== null) {
      dispatch({ type: types.authStartLogin, payload: user });
    } else {
      dispatch({ type: types.authFinishChecking, payload: '' });
    }
  };

  const signUp = async (user: IRegister) => {
    const { email, password, username } = user;
    const isValid =
      email.trim().length === 0 ||
      username.trim().length === 0 ||
      password.trim().length === 0;

    if (isValid) return 'Please complete the fields ';

    const auth = firebaseAuth;

    const errorMessage = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    )
      .then((userCredential) => {
        const { email, photoURL, uid } = userCredential.user;

        updateProfile(userCredential.user, {
          displayName: user.username,
        })
          .then(() => {
            const payload = {
              displayName: auth.currentUser?.displayName,
              email,
              photoURL,
              uid,
            };
            sendEmailVerification(userCredential.user)
              .then(() => {
                console.log('Email verification sent!');
                return '';
              })
              .catch((error) => {
                const errorMessage = error.message;
                console.log({ errorMessage });
                return 'Algo Salio Mal';
              });
            dispatch({ type: types.authLogin, payload });
          })
          .catch((error) => {
            return error.message;
          });
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === 'auth/email-already-in-use')
          return 'Este correo ya esta en uso';
      });

    return errorMessage;
  };

  const logout = async () => {
    try {
      const auth = firebaseAuth;
      await signOut(auth);
      dispatch({ type: types.authLogout, payload: '' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth: { ...state }, loggin, refreshToken, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
