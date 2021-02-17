import { lazy } from 'react';

import { RouteProperties } from '../../routes/Routes.interfaces';

const About = lazy(() => import('./about/About'));

const pagesRoutes: RouteProperties[] = [
	{
		component: About,
		exact: true,
		path: '/'
	}
];
export default pagesRoutes;
