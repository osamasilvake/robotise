import { RoutesInterface } from '../../routes/Routes.interface';
import deepLinksRoutes from './deep-links/DeepLinks.routes';
import middlewareConfigRoutes from './middleware-config/MiddlewareConfig.routes';
import setupRoutes from './setup/Setup.routes';

const settingsRoutes: RoutesInterface[] = [
	...deepLinksRoutes,
	...middlewareConfigRoutes,
	...setupRoutes
];
export default settingsRoutes;
