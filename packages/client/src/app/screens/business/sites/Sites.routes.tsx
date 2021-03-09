import { lazy } from 'react';

import ENV from '../../../../environment';
import { RouteInterface } from '../../../routes/Routes.interfaces';

const Sites = lazy(() => import('./Sites'));

const siteRoutes: RouteInterface[] = [
	{
		component: Sites,
		exact: true,
		path: ENV().ROUTING.SCREENS.BUSINESS.SITES.MAIN
	}
];
export default siteRoutes;
