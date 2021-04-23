import { lazy } from 'react';

import { RouteInterface } from '../../routes/Routes.interfaces';
import { AppConfigService } from '../../services';
import alertConfigRoutes from './alert-config/AlertConfig.routes';

const ChangeLog = lazy(() => import('./change-log/ChangeLog'));
const About = lazy(() => import('./about/About'));

const informationRoutes: RouteInterface[] = [
	...alertConfigRoutes,
	{
		component: ChangeLog,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.INFORMATION.CHANGE_LOG
	},
	{
		component: About,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.INFORMATION.ABOUT
	}
];
export default informationRoutes;
