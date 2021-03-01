import { lazy } from 'react';

import ENV from '../../../environment';
import { RouteInterface } from '../../routes/Routes.interfaces';
import alertConfigRoutes from './alert-config/AlertConfig.routes';
import orderReportsRoutes from './order-reports/OrderReports.routes';
import productRoutes from './products/Products.routes';
import robotRoutes from './robots/Robots.routes';
import siteRoutes from './sites/Sites.routes';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Changelogs = lazy(() => import('./changelogs/Changelogs'));

const packagesRoutes: RouteInterface[] = [
	{
		component: Dashboard,
		exact: true,
		path: ENV().ROUTING.PACKAGES.DASHBOARD
	},
	...siteRoutes,
	...robotRoutes,
	...productRoutes,
	...orderReportsRoutes,
	...alertConfigRoutes,
	{
		component: Changelogs,
		exact: true,
		path: ENV().ROUTING.PACKAGES.CHANGELOG
	}
];
export default packagesRoutes;
