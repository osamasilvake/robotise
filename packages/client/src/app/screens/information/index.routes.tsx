import { lazy } from 'react';

import ENV from '../../../environment';
import { RouteInterface } from '../../routes/Routes.interfaces';
import alertConfigRoutes from './alert-config/AlertConfig.routes';

const ChangeLog = lazy(() => import('./change-log/ChangeLog'));
const About = lazy(() => import('./about/About'));

const informationRoutes: RouteInterface[] = [
	...alertConfigRoutes,
	{
		component: ChangeLog,
		exact: true,
		path: ENV().ROUTING.SCREENS.INFORMATION.CHANGE_LOG
	},
	{
		component: About,
		exact: true,
		path: ENV().ROUTING.SCREENS.INFORMATION.ABOUT
	}
];
export default informationRoutes;
