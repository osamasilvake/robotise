import { RoutesInterface } from '../../routes/Routes.interface';
import deepLinksRoutes from './deep-links/DeepLinks.routes';

const settingsRoutes: RoutesInterface[] = [...deepLinksRoutes];
export default settingsRoutes;
