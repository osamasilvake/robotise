import { lazy } from 'react';

import { RouteInterface } from '../../routes/Routes.interfaces';
import { AppConfigService } from '../../services';

const Login = lazy(() => import('./login/Login'));

const authRoutes: RouteInterface[] = [
	{
		component: Login,
		exact: true,
		path: AppConfigService.AppRoutes.AUTH.LOGIN
	}
];
export default authRoutes;
