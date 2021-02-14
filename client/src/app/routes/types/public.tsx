import About from '../../screens/pages/About/About';
import { RouteProperties } from '../Routes.interfaces';

const routes: RouteProperties[] = [
	{
		component: About,
		exact: true,
		path: '/about'
	}
];
export default routes;
