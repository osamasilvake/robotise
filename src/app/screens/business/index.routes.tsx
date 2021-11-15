import { lazy } from 'react';

import { RouteInterface } from '../../routes/Routes.interfaces';
import { AppConfigService } from '../../services';
import generalRoutes from './general/General.routes';
import robotsRoutes from './robots/Robots.routes';
import sitesRoutes from './sites/Sites.routes';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const businessRoutes: RouteInterface[] = [
	{
		path: AppConfigService.AppRoutes.HOME,
		component: Dashboard
	},
	...generalRoutes,
	...sitesRoutes,
	...robotsRoutes
];
export default businessRoutes;
