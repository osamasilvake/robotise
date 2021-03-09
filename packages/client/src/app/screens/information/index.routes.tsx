import { lazy } from 'react';

import ENV from '../../../environment';
import { RouteInterface } from '../../routes/Routes.interfaces';
import alertConfigRoutes from './alert-config/AlertConfig.routes';

const Changelogs = lazy(() => import('./changelogs/Changelogs'));
const About = lazy(() => import('./about/About'));

const informationRoutes: RouteInterface[] = [
	...alertConfigRoutes,
	{
		component: Changelogs,
		exact: true,
		path: ENV().ROUTING.SCREENS.INFORMATION.CHANGELOGS
	},
	{
		component: About,
		exact: true,
		path: ENV().ROUTING.SCREENS.INFORMATION.ABOUT
	}
];
export default informationRoutes;
