import { lazy } from 'react';

import { RouteInterface } from '../../routes/Routes.interfaces';
import { AppConfigService } from '../../services';
import alertCodesRoutes from './alert-codes/AlertCodes.routes';

const About = lazy(() => import('./about/About'));

const informationRoutes: RouteInterface[] = [
	...alertCodesRoutes,
	{
		component: About,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.INFORMATION.ABOUT
	}
];
export default informationRoutes;
