import { lazy } from 'react';

import ENV from '../../../environment';
import { RouteInterface } from '../../routes/Routes.interfaces';
import robotRoutes from './robots/Robots.routes';
import siteRoutes from './sites/Sites.routes';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const businessRoutes: RouteInterface[] = [
	{
		component: Dashboard,
		exact: true,
		path: ENV().ROUTING.SCREENS.BUSINESS.DASHBOARD
	},
	...siteRoutes,
	...robotRoutes
];
export default businessRoutes;
