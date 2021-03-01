import { lazy } from 'react';

import ENV from '../../../../environment';
import { RouteInterface } from '../../../routes/Routes.interfaces';

const AlertConfig = lazy(() => import('./AlertConfig'));

const alertConfigRoutes: RouteInterface[] = [
	{
		component: AlertConfig,
		exact: true,
		path: ENV().ROUTING.PACKAGES.ALERT_CONFIG.MAIN
	}
];
export default alertConfigRoutes;
