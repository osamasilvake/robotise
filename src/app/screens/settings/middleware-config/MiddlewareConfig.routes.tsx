import { lazy } from 'react';

import { RoutesInterface } from '../../../routes/Routes.interface';
import { AppConfigService } from '../../../services';

const MiddlewareConfig = lazy(() => import('./MiddlewareConfig'));

const middlewareConfigRoutes: RoutesInterface[] = [
	{
		path: AppConfigService.AppRoutes.SCREENS.SETTINGS.MIDDLEWARE_CONFIG,
		component: MiddlewareConfig
	}
];
export default middlewareConfigRoutes;
