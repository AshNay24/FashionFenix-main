import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { IPrivPublicRoutes } from '../interface/private-public-routes';

export const PublicRoutes = ({
  isAuthenticated,
  render: Component,
  ...rest
}: IPrivPublicRoutes) => {
  return (
    <Route
      {...rest}
      // render here!
      render={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/productos" />
        )
      }
    />
  );
};
