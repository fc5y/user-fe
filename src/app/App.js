import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './containers/HomePage';
import Page404 from './containers/Page404';
import InfoPage from './containers/InfoPage';
import InfoRulesPage from './containers/InfoRulesPage';
import Header from './components/NavBar';

import './style.scss';

// To check if users have logined or not. Waiting for Item name.
const username = JSON.parse(localStorage.getItem('username')) || '';
// To set username:
// localStorage.setItem('username', JSON.stringify(username_value));

// Set joinDisabled to 'true' to block users.
const joinDisabled = false;

export default function App() {
  return (
    <BrowserRouter>
      <Header username={username} />
      <Switch>
        <Route exact path="/">
          <HomePage username={username} disabled={joinDisabled} />
        </Route>
        <Route exact path="/info">
          <InfoPage />
        </Route>
        <Route exact path="/info/rules">
          <InfoRulesPage />
        </Route>
        <Route exact path="*">
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
