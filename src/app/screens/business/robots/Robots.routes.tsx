import { lazy } from 'react';

import { RouteInterface } from '../../../routes/Routes.interfaces';
import { AppConfigService } from '../../../services';
import Robot from './Robot';

const Robots = lazy(() => import('./Robots'));

/**
 * NOTE:
 * the tabs are shown based on the routes object
 * therefore, changing the sequence of objects will make tabs malfunction.
 */
const robotsRoutes: RouteInterface[] = [
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
		component: Robot
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.COMMANDS_LOG,
		component: Robot
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.ELEVATOR_CALLS,
		component: Robot
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.CONFIGURATION,
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
		component: Robot
	}
];
export default robotsRoutes;
