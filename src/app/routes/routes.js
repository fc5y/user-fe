import HomePage from '../containers/HomePage';
import Page404 from '../containers/Page404';
import InfoPage from '../containers/InfoPage';
import CmsHelpPage from '../containers/CmsHelpPage';
import JoinHelpPage from '../containers/JoinHelpPage';
import EnterPage from '../containers/EnterPage';
import LoginPage from '../containers/LoginPage';
import SignupPage from '../containers/SignupPage';
import ProfilePage from '../containers/ProfilePage';

const ROUTES = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/help',
    exact: true,
    component: InfoPage,
  },
  {
    path: '/help/cms',
    exact: true,
    component: CmsHelpPage,
  },
  {
    path: '/help/join',
    exact: true,
    component: JoinHelpPage,
  },
  {
    path: '/users/:username',
    exact: true,
    component: ProfilePage,
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
    path: '/auth/signup',
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
