import { lazy } from 'react';

import { RoutesInterface } from '../../routes/Routes.interface';
import { AppConfigService } from '../../services';
import alertCodesRoutes from './alert-codes/AlertCodes.routes';

const About = lazy(() => import('./about/About'));

const informationRoutes: RoutesInterface[] = [
	...alertCodesRoutes,
	{
		path: AppConfigService.AppRoutes.SCREENS.INFORMATION.ABOUT,
		component: About
	}
];
export default informationRoutes;
