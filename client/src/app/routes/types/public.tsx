import { lazy } from 'react';

import { RouteProperties } from '../Routes.interfaces';

const About = lazy(() => import('../../screens/pages/About/About'));

const routes: RouteProperties[] = [
	{
		component: About,
		exact: true,
		path: '/about'
	}
];
export default routes;
