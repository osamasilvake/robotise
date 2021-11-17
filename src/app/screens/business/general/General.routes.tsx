import { lazy } from 'react';

import { RouteInterface } from '../../../routes/Routes.interfaces';
import { AppConfigService } from '../../../services';
import Gen from './Gen';

const General = lazy(() => import('./General'));

/**
 * NOTE:
 * the tabs are shown based on the routes object
 * therefore, changing the sequence of objects will make tabs malfunction.
 */
const generalRoutes: RouteInterface[] = [
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

	/**
	 * Details
	 */
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.EMAILS.DETAIL,
		component: Gen
	}
];
export default generalRoutes;
