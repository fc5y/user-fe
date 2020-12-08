import HomePage from '../containers/HomePage';
import Page404 from '../containers/Page404';
import InfoPage from '../containers/InfoPage';
import CmsHelpPage from '../containers/CmsHelpPage';
import JoinHelpPage from '../containers/JoinHelpPage';
import EnterPage from '../containers/Contests/EnterPage';
import LoginPage from '../containers/LoginPage';
import SignupPage from '../containers/SignupPage';
import ProfilePage from '../containers/ProfilePage';

const ROUTES = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  /**
   * HELP REGION
   */
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
  /**
   * USER REGION
   */
  {
    path: '/users/:username',
    exact: true,
    component: ProfilePage,
  },
  /**
   * AUTH REGION
   */
  {
    path: '/auth/login',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/auth/signup',
    exact: true,
    component: SignupPage,
  },
  /**
   * CONTEST REGION
   */
  {
    path: '/contests/:id/enter',
    exact: true,
    component: EnterPage,
  },
  {
    path: '*',
    exact: true,
    component: Page404,
  },
];

export default ROUTES;
