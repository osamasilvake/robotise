import { lazy } from 'react';

import { RouteInterface } from '../../routes/Routes.interfaces';
import { AppConfigService } from '../../services';
import robotsRoutes from './robots/Robots.routes';
import siteRoutes from './sites/Sites.routes';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const businessRoutes: RouteInterface[] = [
	{
		component: Dashboard,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.DASHBOARD
	},
	...siteRoutes,
	...robotsRoutes
];
export default businessRoutes;
