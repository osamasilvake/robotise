import { lazy } from 'react';

import { RouteInterface } from '../../../routes/Routes.interfaces';
import { AppConfigService } from '../../../services';

const AlertCodes = lazy(() => import('./AlertCodes'));

const alertCodesRoutes: RouteInterface[] = [
	{
		component: AlertCodes,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.INFORMATION.ALERT_CODES
	}
];
export default alertCodesRoutes;
