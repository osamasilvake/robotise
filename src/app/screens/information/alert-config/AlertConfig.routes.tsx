import { lazy } from 'react';

import { RouteInterface } from '../../../routes/Routes.interfaces';
import { AppConfigService } from '../../../services';

const AlertConfig = lazy(() => import('./AlertConfig'));

const alertConfigRoutes: RouteInterface[] = [
	{
		component: AlertConfig,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.INFORMATION.ALERT_CONFIG.MAIN
	}
];
export default alertConfigRoutes;
