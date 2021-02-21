import { lazy } from 'react';

import { RouteInterface } from '../../routes/Routes.interfaces';

const Login = lazy(() => import('./login/Login'));

const authenticationRoutes: RouteInterface[] = [
	{
		component: Login,
		exact: true,
		path: '/login'
	}
];
export default authenticationRoutes;
