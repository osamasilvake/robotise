import { lazy } from 'react';

import { RouteInterface } from '../../routes/Routes.interfaces';
import { AppConfigService } from '../../services';
import robotsRoutes from './robots/Robots.routes';
import sitesRoutes from './sites/Sites.routes';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const businessRoutes: RouteInterface[] = [
	{
		component: Dashboard,
		exact: true,
		path: AppConfigService.AppRoutes.HOME
	},
	...sitesRoutes,
	...robotsRoutes
];
export default businessRoutes;
