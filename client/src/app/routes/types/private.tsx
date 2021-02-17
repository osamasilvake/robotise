import { lazy } from 'react';

import siteRoutes from '../../screens/packages/sites/Sites.routes';
import { RouteProperties } from '../Routes.interfaces';

const Dashboard = lazy(() => import('../../screens/packages/dashboard/Dashboard'));

const routes: RouteProperties[] = [
	{
		component: Dashboard,
		exact: true,
		path: '/'
	},
	...siteRoutes
];
export default routes;
