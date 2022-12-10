import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

export const useAuthContext = () => {
  const {
    loggin,
    signUp,
    auth: { cheking, displayName, email, photoURL, uid },
    refreshToken,
    logout,
  } = useContext(AuthContext);

  return {
    cheking,
    loggin,
    signUp,
    displayName,
    email,
    photoURL,
    uid,
    refreshToken,
    logout,
  };
};
