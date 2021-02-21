import GlobalLayout from '../layouts/GlobalLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import { RouteTypeEnum } from './Routes.enum';
import { RouteTemplateInterface } from './Routes.interfaces';
import privateRoutes from './types/private';
import publicRoutes from './types/public';
import sessionRoutes from './types/session';

const routesTemplate: RouteTemplateInterface[] = [
	{
		routes: publicRoutes,
		template: GlobalLayout,
		type: RouteTypeEnum.PUBLIC
	},
	{
		routes: privateRoutes,
		template: PrivateLayout,
		type: RouteTypeEnum.PRIVATE
	},
	{
		routes: sessionRoutes,
		template: GlobalLayout,
		type: RouteTypeEnum.SESSION
	}
];
export default routesTemplate;
