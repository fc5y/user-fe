import HomePage from '../containers/HomePage';
import Page404 from '../containers/Page404';
import InfoPage from '../containers/InfoPage';
import EnterPage from '../containers/EnterPage';
import LoginPage from '../containers/LoginPage';
import SignupPage from '../containers/SignupPage';

const ROUTES = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/info',
    exact: true,
    component: InfoPage,
  },
  {
    path: '/enter',
    exact: true,
    component: EnterPage,
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/signup',
    exact: true,
    component: SignupPage,
  },
  {
    path: '*',
    exact: true,
    component: Page404,
  },
];

export default ROUTES;
