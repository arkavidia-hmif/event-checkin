import { ROUTE_LOGIN } from './constans';

import Login from './../components/@Login';
import Main from './../components/@Main';

const routes = [
  {
    path: ROUTE_LOGIN,
    component: Login
  },
  {
    component: Main
  }
];

export default routes;
