import { lazy } from 'react';

import { RouteInterface } from '../../../routes/Routes.interfaces';
import { AppConfigService } from '../../../services';
import Robot from './Robot';

const Robots = lazy(() => import('./Robots'));

const robotsRoutes: RouteInterface[] = [
	{
		component: Robots,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN
	},
	{
		component: Robot,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.DETAIL
	}
];
export default robotsRoutes;
