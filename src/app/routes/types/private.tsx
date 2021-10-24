import businessRoutes from '../../screens/business/index.routes';
import informationRoutes from '../../screens/information/index.routes';
import settingsRoutes from '../../screens/settings/index.routes';
import { RouteInterface } from '../Routes.interfaces';

const routes: RouteInterface[] = [...businessRoutes, ...settingsRoutes, ...informationRoutes];
export default routes;
