import * as ROUTES from './constants';

// Components
import HomePage from '../containers/HomePage';
import Page404 from '../containers/Page404';
import InfoPage from '../containers/InfoPage';
import UpdatedHelpPage from '../containers/HelpPage';
import LoginPage from '../containers/LoginPage';
import SignupPage from '../containers/SignupPage';
import ProfilePage from '../containers/ProfilePage';
import ContestDetail from '../containers/Contests/ContestDetail';
import ContestsHome from '../containers/Contests/ContestsHome';
import ContestEnterPage from '../containers/Contests/ContestEnterPage';
import ContestRegister from '../containers/Contests/ContestRegister';
import ResetPasswordPage from '../containers/ResetPassword';
import ChangePasswordPage from '../containers/ChangePassword';
import RankingPage from '../containers/RankingPage';
import SettingsPage from '../containers/SettingsPage';
import PolicyPage from '../containers/PolicyPage';
import MigrationPlan from '../containers/MigrationPlan';

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
    path: ROUTES.ROUTE_HELP_JOIN,
    exact: true,
    component: UpdatedHelpPage,
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
  {
    path: ROUTES.ROUTE_RESET_PASSWORD,
    exact: true,
    component: ResetPasswordPage,
  },
  /**
   * CONTEST REGION
   */
  {
    path: ROUTES.ROUTE_CONTEST,
    exact: true,
    component: ContestDetail,
  },
  {
    path: ROUTES.ROUTE_CONTESTS,
    exact: true,
    component: ContestsHome,
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
    path: ROUTES.ROUTE_CHANGE_PASSWORD,
    exact: true,
    component: ChangePasswordPage,
  },
  {
    path: ROUTES.ROUTE_SETTINGS,
    exact: true,
    component: SettingsPage,
  },
  /**
   * RANKING REGION
   */
  {
    path: ROUTES.ROUTE_RANKING,
    exact: true,
    component: RankingPage,
  },
  /**
   * POLICY REGION
   */
  {
    path: ROUTES.ROUTE_POLICY,
    exact: true,
    component: PolicyPage,
  },
  /**
   * MIGRATION PLAN REGION
   */
  {
    path: ROUTES.ROUTE_MIGRATION_PLAN,
    exact: true,
    component: MigrationPlan,
  },
  {
    path: '*',
    exact: true,
    component: Page404,
  },
];

export default ROUTES_CONFIG;
