import Dashboard from '../../screens/packages/dashboard/Dashboard';
import Sites from '../../screens/packages/sites/Sites';
import { RouteProperties } from '../Routes.interfaces';

const routes: RouteProperties[] = [
	{
		component: Dashboard,
		exact: true,
		path: '/'
	},
	{
		component: Sites,
		exact: true,
		path: '/sites'
	}
];
export default routes;
