import { lazy } from 'react';

import { RouteInterface } from '../../../routes/Routes.interfaces';
import { AppConfigService } from '../../../services';

const Robots = lazy(() => import('./Robots'));

const robotRoutes: RouteInterface[] = [
	{
		component: Robots,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN
	}
];
export default robotRoutes;
