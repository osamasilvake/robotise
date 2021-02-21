import { lazy } from 'react';

import { RouteInterface } from '../../routes/Routes.interfaces';

const About = lazy(() => import('./about/About'));

const pagesRoutes: RouteInterface[] = [
	{
		component: About,
		exact: true,
		path: '/about'
	}
];
export default pagesRoutes;
