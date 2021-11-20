import { lazy } from 'react';

import { RoutesInterface } from '../../../routes/Routes.interface';
import { AppConfigService } from '../../../services';
import Site from './Site';

const Sites = lazy(() => import('./Sites'));

/**
 * NOTE:
 * the tabs are shown based on the routes object
 * therefore, changing the sequence of objects will make tabs malfunction.
 */
const sitesRoutes: RoutesInterface[] = [
	/**
	 * Main
	 */
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.MAIN,
		component: Sites
	},

	/**
	 * Tabs
	 */
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.DETAIL,
		component: Site
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.PRODUCTS.MAIN,
		component: Site
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.ROOMS,
		component: Site
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.PHONE_CONFIGS,
		component: Site
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.PHONE_CALLS,
		component: Site
	},
	{
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.CONFIGURATION,
		component: Site
	}
];
export default sitesRoutes;
