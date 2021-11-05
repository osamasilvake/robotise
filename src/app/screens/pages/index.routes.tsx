import { RouteInterface } from '../../routes/Routes.interfaces';
import Error404 from './404/Error404';

const pagesRoutes: RouteInterface[] = [
	{
		path: '*',
		component: Error404
	}
];
export default pagesRoutes;
