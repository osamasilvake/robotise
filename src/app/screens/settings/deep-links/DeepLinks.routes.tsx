import { lazy } from 'react';

import { RouteInterface } from '../../../routes/Routes.interfaces';
import { AppConfigService } from '../../../services';

const DeepLinks = lazy(() => import('./DeepLinks'));

const deepLinksRoutes: RouteInterface[] = [
	{
		component: DeepLinks,
		exact: true,
		path: AppConfigService.AppRoutes.SCREENS.SETTINGS.DEEP_LINKS
	}
];
export default deepLinksRoutes;
