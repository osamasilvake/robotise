import businessRoutes from '../../screens/business/index.routes';
import informationRoutes from '../../screens/information/index.routes';
import { RouteInterface } from '../Routes.interfaces';

const routes: RouteInterface[] = [...businessRoutes, ...informationRoutes];
export default routes;
