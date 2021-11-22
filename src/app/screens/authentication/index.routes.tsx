import { lazy } from 'react';

import { RoutesInterface } from '../../routes/Routes.interface';
import { AppConfigService } from '../../services';

const Login = lazy(() => import('./login/Login'));

const authRoutes: RoutesInterface[] = [
	{
		path: AppConfigService.AppRoutes.AUTH.LOGIN,
		component: Login
	}
];
export default authRoutes;
