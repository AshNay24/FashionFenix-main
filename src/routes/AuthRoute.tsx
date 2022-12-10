import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRoute = () => {
  return (
    <Switch>
      <Route component={LoginScreen} path="/auth/sign-in/" />
      <Route component={RegisterScreen} path="/auth/sign-up/" />

      <Redirect to="/auth/sign-in" />
    </Switch>
  );
};
