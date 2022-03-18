import { RoutesInterface } from '../../routes/Routes.interface';
import deepLinksRoutes from './deep-links/DeepLinks.routes';
import setupRoutes from './setup/Setup.routes';

const settingsRoutes: RoutesInterface[] = [...deepLinksRoutes, ...setupRoutes];
export default settingsRoutes;
