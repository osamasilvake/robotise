import { lazy } from 'react';

import { RouteInterface } from '../../routes/Routes.interfaces';
import { AppConfigService } from '../../services';
import alertCodesRoutes from './alert-codes/AlertCodes.routes';

const About = lazy(() => import('./about/About'));

const informationRoutes: RouteInterface[] = [
	...alertCodesRoutes,
	{
		path: AppConfigService.AppRoutes.SCREENS.INFORMATION.ABOUT,
		component: About
	}
];
export default informationRoutes;
