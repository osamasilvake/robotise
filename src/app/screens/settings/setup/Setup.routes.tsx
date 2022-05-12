import { lazy } from 'react';

import { RoutesInterface } from '../../../routes/Routes.interface';
import { AppConfigService } from '../../../services';

const Setup = lazy(() => import('./Setup'));

/**
 * NOTE:
 * the tabs are shown based on the routes object
 * therefore, changing the sequence of objects will make tabs malfunction.
 */
const setupRoutes: RoutesInterface[] = [
	/**
	 * Main
	 */
	{
		path: AppConfigService.AppRoutes.SCREENS.SETTINGS.SETUP.MAIN,
		component: Setup
	},

	/**
	 * Tabs
	 */
	{
		path: AppConfigService.AppRoutes.SCREENS.SETTINGS.SETUP.WIFI_CONFIG,
		component: Setup
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.SETTINGS.SETUP.ROBOT_PASSWORD,
		component: Setup
	}
];
export default setupRoutes;
