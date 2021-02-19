import { lazy } from 'react';

import { RouteProperties } from '../../../routes/Routes.interfaces';

const Sites = lazy(() => import('./Sites'));

const siteRoutes: RouteProperties[] = [
	{
		component: Sites,
		exact: true,
		path: '/sites'
	}
];
export default siteRoutes;
