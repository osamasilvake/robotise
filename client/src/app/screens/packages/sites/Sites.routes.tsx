import { lazy } from 'react';

import { RouteInterface } from '../../../routes/Routes.interfaces';

const Sites = lazy(() => import('./Sites'));

const siteRoutes: RouteInterface[] = [
	{
		component: Sites,
		exact: true,
		path: '/sites'
	}
];
export default siteRoutes;
