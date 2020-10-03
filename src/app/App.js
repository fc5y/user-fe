import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import Page404 from './components/Page404';
import InfoPage from './components/InfoPage';
import InfoRulesPage from './components/InfoRulesPage';
import SignupPage from './components/SignupPage';

import './style.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/info" component={InfoPage} />
        <Route exact path="/info/rules" component={InfoRulesPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="*" component={Page404} />
      </Switch>
    </BrowserRouter>
  );
}
