import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ROUTES from './routes';

export function renderRoute() {
  return (
    <Switch>
      {ROUTES.map((route) => {
        return (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        );
      })}
    </Switch>
  );
}
