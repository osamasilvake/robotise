import { lazy } from 'react';

import { RouteInterface } from '../../../routes/Routes.interfaces';
import { AppConfigService } from '../../../services';

const Sites = lazy(() => import('./Sites'));

const siteRoutes: RouteInterface[] = [
	{
		component: Sites,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.MAIN
	}
];
export default siteRoutes;
