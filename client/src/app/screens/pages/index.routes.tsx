import { lazy } from 'react';

import ENV from '../../../environment';
import { RouteInterface } from '../../routes/Routes.interfaces';

const Error404 = lazy(() => import('./404/Error404'));

const pagesRoutes: RouteInterface[] = [
	{
		component: Error404,
		exact: true,
		path: ENV().ROUTING.SCREENS.PAGES.E404
	}
];
export default pagesRoutes;
