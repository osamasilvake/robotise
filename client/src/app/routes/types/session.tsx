import Login from '../../screens/authentication/login/Login';
import { RouteProperties } from '../Routes.interfaces';

const routes: RouteProperties[] = [
	{
		component: Login,
		exact: true,
		path: '/login'
	}
];
export default routes;
