import { lazy } from 'react';

import { RoutesInterface } from '../../../routes/Routes.interface';
import { AppConfigService } from '../../../services';

const DeepLinks = lazy(() => import('./DeepLinks'));

const deepLinksRoutes: RoutesInterface[] = [
	{
		path: AppConfigService.AppRoutes.SCREENS.SETTINGS.DEEP_LINKS,
		component: DeepLinks,
		scope: true
	}
];
export default deepLinksRoutes;
