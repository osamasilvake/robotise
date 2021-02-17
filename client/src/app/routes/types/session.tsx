import { lazy } from 'react';

import { RouteProperties } from '../Routes.interfaces';

const Login = lazy(() => import('../../screens/authentication/login/Login'));

const routes: RouteProperties[] = [
	{
		component: Login,
		exact: true,
		path: '/login'
	}
];
export default routes;
