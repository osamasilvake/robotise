import { lazy } from 'react';

import { RouteInterface } from '../../../routes/Routes.interfaces';
import { AppConfigService } from '../../../services';
import Site from './Site';

const Sites = lazy(() => import('./Sites'));

/**
 * NOTE:
 * the site tabs are shown based on the sitesRoutes objects
 * therefore, changing the sequence of objects will make tabs malfunction.
 */
const sitesRoutes: RouteInterface[] = [
	/**
	 * Main
	 */
	{
		component: Sites,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.MAIN
	},

	/**
	 * Tabs
	 */
	{
		component: Site,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.DETAIL
	},
	{
		component: Site,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.PRODUCTS.MAIN
	},
	{
		component: Site,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.CONFIGURATION
	}
];
export default sitesRoutes;
