import { onAuthStateChanged } from 'firebase/auth';
import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import JoinOurTeam from '../components/auth/JoinOurTeam';
import SmallWithSocial from '../components/footer/SmallWithSocial';
import { Loader } from '../components/load/Loader';
import Navbar from '../components/navbar/Navbar';
import { Products } from '../components/product/Products';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProducts } from '../hooks/useProducts';
import { firebaseAuth } from '../libs/firebase-config';
import { AuthRoute } from './AuthRoute';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoutes } from './PublicRoute';

export const AppRoutes = () => {
  const { refreshToken, uid, cheking } = useAuthContext();
  const { getProducts } = useProducts();
  const auth = firebaseAuth;

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const { displayName, email, uid, photoURL } = user;
        refreshToken({ displayName, email, uid, photoURL });
      } else {
        refreshToken(null);
      }
    });
    getProducts();
  }, []);

  if (!cheking) {
    return <Loader />;
  }

  const isLogged = uid !== null;
  return (
    <Router>
      {/* nav */}
      <Navbar />

      {/* main app */}

      <Switch>
        <PrivateRoute
          isAuthenticated={isLogged}
          render={Products}
          path={'/productos/'}
        />
        <PublicRoutes
          isAuthenticated={isLogged}
          render={AuthRoute}
          path="/auth/"
        />
        <PublicRoutes
          isAuthenticated={isLogged}
          render={JoinOurTeam}
          path="/"
        />

        <Redirect to={'/'} />
      </Switch>

      {/* footer */}
      <SmallWithSocial />
    </Router>
  );
};
