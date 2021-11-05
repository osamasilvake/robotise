import { lazy } from 'react';

import { RouteInterface } from '../../routes/Routes.interfaces';
import { AppConfigService } from '../../services';

const Login = lazy(() => import('./login/Login'));

const authRoutes: RouteInterface[] = [
	{
		path: AppConfigService.AppRoutes.AUTH.LOGIN,
		component: Login
	}
];
export default authRoutes;
