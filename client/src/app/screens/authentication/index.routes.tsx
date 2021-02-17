import { lazy } from 'react';

import { RouteProperties } from '../../routes/Routes.interfaces';

const Login = lazy(() => import('./login/Login'));

const authenticationRoutes: RouteProperties[] = [
	{
		component: Login,
		exact: true,
		path: '/'
	}
];
export default authenticationRoutes;
