import { lazy } from 'react';

import ENV from '../../../../environment';
import { RouteInterface } from '../../../routes/Routes.interfaces';

const OrderReports = lazy(() => import('./OrderReports'));

const orderReportsRoutes: RouteInterface[] = [
	{
		component: OrderReports,
		exact: true,
		path: ENV().ROUTING.PACKAGES.ORDER_REPORTS.MAIN
	}
];
export default orderReportsRoutes;
