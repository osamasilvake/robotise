import businessRoutes from '../../screens/business/index.routes';
import informationRoutes from '../../screens/information/index.routes';
import settingsRoutes from '../../screens/settings/index.routes';
import { RoutesInterface } from '../Routes.interface';

const routes: RoutesInterface[] = [...businessRoutes, ...settingsRoutes, ...informationRoutes];
export default routes;
