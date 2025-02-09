import { lazy } from 'react';

import { RoutesInterface } from '../../../routes/Routes.interface';
import { AppConfigService } from '../../../services';

const Robot = lazy(() => import('./Robot'));
const Robots = lazy(() => import('./Robots'));

/**
 * NOTE:
 * the tabs are shown based on the routes object
 * therefore, changing the sequence of objects will make tabs malfunction.
 */
const robotsRoutes: RoutesInterface[] = [
	/**
	 * Main
	 */
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN,
		component: Robots
	},

	/**
	 * Tabs
	 */
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.DETAIL,
		component: Robot
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.INVENTORY,
		component: Robot
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ORDERS.MAIN,
		component: Robot
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.MAIN,
		component: Robot,
		scope: false,
		scopeName: AppConfigService.AppRoutesScope.PURCHASES
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.COMMANDS_LOG,
		component: Robot
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ELEVATOR_CALLS,
		component: Robot
	},

	/**
	 * Configuration sub tabs
	 */
	{
		path: `${AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.CONFIGURATION}`,
		component: Robot
	},
	{
		path: `${AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.CONFIGURATION}/:configId`,
		component: Robot
	},

	/**
	 * Details
	 */
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ORDERS.DETAIL,
		component: Robot
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.DETAIL,
		component: Robot,
		scope: false,
		scopeName: AppConfigService.AppRoutesScope.PURCHASES
	}
];
export default robotsRoutes;
