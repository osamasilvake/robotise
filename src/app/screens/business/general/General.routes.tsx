import { lazy } from 'react';

import { RoutesInterface } from '../../../routes/Routes.interface';
import { AppConfigService } from '../../../services';
import Gen from './Gen';

const General = lazy(() => import('./General'));

/**
 * NOTE:
 * the tabs are shown based on the routes object
 * therefore, changing the sequence of objects will make tabs malfunction.
 */
const generalRoutes: RoutesInterface[] = [
	/**
	 * Main
	 */
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.MAIN,
		component: General
	},

	/**
	 * Tabs
	 */
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.EMAILS.MAIN,
		component: General
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.ALL_ORDERS.MAIN,
		component: General
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.ALL_ELEVATOR_CALLS,
		component: General
	},

	/**
	 * Details
	 */
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.EMAILS.DETAIL,
		component: Gen
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.ALL_ORDERS.DETAIL,
		component: Gen
	}
];
export default generalRoutes;
