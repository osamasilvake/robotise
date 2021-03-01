import { lazy } from 'react';

import ENV from '../../../../environment';
import { RouteInterface } from '../../../routes/Routes.interfaces';

const Robots = lazy(() => import('./Robots'));

const robotRoutes: RouteInterface[] = [
	{
		component: Robots,
		exact: true,
		path: ENV().ROUTING.PACKAGES.ROBOTS.MAIN
	}
];
export default robotRoutes;
