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
	 * Main
	 */
	{
		component: Robots,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN
	},

	/**
	 * Tabs
	 */
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
	{
		component: Robot,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.CONFIGURATION
	},

	/**
	 * Details
	 */
	{
		component: Robot,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ORDERS.DETAIL
	},
	{
		component: Robot,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.DETAIL
	}
];
export default robotsRoutes;
