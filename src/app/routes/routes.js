import * as ROUTES from './constants';

// Components
import HomePage from '../containers/HomePage';
import Page404 from '../containers/Page404';
import InfoPage from '../containers/InfoPage';
import CmsHelpPage from '../containers/HelpPage/CmsHelpPage';
import JoinHelpPage from '../containers/HelpPage/JoinHelpPage';
import LoginPage from '../containers/LoginPage';
import SignupPage from '../containers/SignupPage';
import ProfilePage from '../containers/ProfilePage';
import Contest from '../containers/Contests/Contest';
import Contests from '../containers/Contests/Contests';
import ContestEnterPage from '../containers/Contests/ContestEnterPage';
import ContestRegister from '../containers/Contests/ContestRegister';
import SettingsPage from '../containers/SettingsPage';

const ROUTES_CONFIG = [
  /**
   * HOME REGION
   */
  {
    path: ROUTES.ROUTE_HOMEPAGE,
    exact: true,
    component: HomePage,
  },
  /**
   * HELP REGION
   */
  {
    path: ROUTES.ROUTE_HELP,
    exact: true,
    component: InfoPage,
  },
  {
    path: ROUTES.ROUTE_HELP_CMS,
    exact: true,
    component: CmsHelpPage,
  },
  {
    path: ROUTES.ROUTE_HELP_JOIN,
    exact: true,
    component: JoinHelpPage,
  },
  /**
   * USER REGION
   */
  {
    path: ROUTES.ROUTE_USER_PROFILE,
    exact: true,
    component: ProfilePage,
  },
  /**
   * AUTH REGION
   */
  {
    path: ROUTES.ROUTE_LOGIN,
    exact: true,
    component: LoginPage,
  },
  {
    path: ROUTES.ROUTE_SIGNUP,
    exact: true,
    component: SignupPage,
  },
  /**
   * CONTEST REGION
   */
  {
    path: ROUTES.ROUTE_CONTEST,
    exact: true,
    component: Contest,
  },
  {
    path: ROUTES.ROUTE_CONTESTS,
    exact: true,
    component: Contests,
  },
  {
    path: ROUTES.ROUTE_CONTEST_ENTER,
    exact: true,
    component: ContestEnterPage,
  },
  {
    path: ROUTES.ROUTE_CONTEST_REGISTER,
    exact: true,
    component: ContestRegister,
  },
  /**
   * SETTINGS REGION
   */
  {
    path: ROUTES.ROUTE_SETTINGS,
    exact: true,
    component: SettingsPage,
  },
  {
    path: '*',
    exact: true,
    component: Page404,
  },
];

export default ROUTES_CONFIG;
