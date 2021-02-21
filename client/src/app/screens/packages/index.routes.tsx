import { lazy } from 'react';

import { RouteInterface } from '../../routes/Routes.interfaces';
import siteRoutes from './sites/Sites.routes';
const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const packagesRoutes: RouteInterface[] = [
	{
		component: Dashboard,
		exact: true,
		path: '/'
	},
	...siteRoutes
];
export default packagesRoutes;
