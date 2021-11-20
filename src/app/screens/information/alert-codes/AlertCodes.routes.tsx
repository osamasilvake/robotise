import { lazy } from 'react';

import { RoutesInterface } from '../../../routes/Routes.interface';
import { AppConfigService } from '../../../services';

const AlertCodes = lazy(() => import('./AlertCodes'));

const alertCodesRoutes: RoutesInterface[] = [
	{
		path: AppConfigService.AppRoutes.SCREENS.INFORMATION.ALERT_CODES,
		component: AlertCodes
	}
];
export default alertCodesRoutes;
