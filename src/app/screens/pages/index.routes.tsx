import { RoutesInterface } from '../../routes/Routes.interface';
import Error404 from './404/Error404';

const pagesRoutes: RoutesInterface[] = [
	{
		path: '*',
		component: Error404
	}
];
export default pagesRoutes;
