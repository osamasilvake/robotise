import { lazy } from 'react';

import { RouteInterface } from '../../../routes/Routes.interfaces';
import { AppConfigService } from '../../../services';
import Robot from './Robot';

const Robots = lazy(() => import('./Robots'));

/**
 * NOTE:
 * the robot tabs are shown based on the robotsRoutes objects
 * therefore, changing the sequence of objects will make tabs malfunction.
 */
const robotsRoutes: RouteInterface[] = [
	/**
	 * Tabs
	 */
	{
		component: Robots,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN
	},
	{
		component: Robot,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.DETAIL
	},
	{
		component: Robot,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.INVENTORY
	},
	{
		component: Robot,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ORDERS.MAIN
	},
	{
		component: Robot,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.MAIN
	},

	/**
	 * Detail
	 */
	{
		component: Robot,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ORDERS.DETAIL
	}
];
export default robotsRoutes;
