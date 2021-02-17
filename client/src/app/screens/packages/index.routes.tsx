import { lazy } from 'react';

import { RouteProperties } from '../../routes/Routes.interfaces';
import siteRoutes from './sites/Sites.routes';
const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const packagesRoutes: RouteProperties[] = [
	{
		component: Dashboard,
		exact: true,
		path: '/'
	},
	...siteRoutes
];
export default packagesRoutes;
