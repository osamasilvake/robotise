import { RouteInterface } from '../../routes/Routes.interfaces';
import deepLinksRoutes from './deep-links/DeepLinks.routes';

const settingsRoutes: RouteInterface[] = [...deepLinksRoutes];
export default settingsRoutes;
