import { RoutesInterface } from '../../routes/Routes.interface';
import alertCodesRoutes from './alert-codes/AlertCodes.routes';

const informationRoutes: RoutesInterface[] = [...alertCodesRoutes];
export default informationRoutes;
