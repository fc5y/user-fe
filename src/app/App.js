import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Context
import { UserInfoProvider } from '../shared/userInfo';

// Containers
import HomePage from './containers/HomePage';
import Page404 from './containers/Page404';
import InfoPage from './containers/InfoPage';
import InfoRulesPage from './containers/InfoRulesPage';
import EnterPage from './containers/EnterPage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import Header from './components/NavBar';

import './style.scss';

export default function App() {
  return (
    <BrowserRouter>
      <UserInfoProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/info">
            <InfoPage />
          </Route>
          <Route exact path="/info/rules">
            <InfoRulesPage />
          </Route>
          <Route exact path="/enter">
            <EnterPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <Route exact path="*">
            <Page404 />
          </Route>
        </Switch>
      </UserInfoProvider>
    </BrowserRouter>
  );
}
