import GlobalLayout from '../layouts/global/GlobalLayout';
import PrivateLayout from '../layouts/private/PrivateLayout';
import { RouteTypeEnum } from './Routes.enum';
import { RoutesTemplateInterface } from './Routes.interface';
import privateRoutes from './types/private';
import publicRoutes from './types/public';
import sessionRoutes from './types/session';

const routesTemplate: RoutesTemplateInterface[] = [
	{
		routes: publicRoutes,
		template: GlobalLayout,
		type: RouteTypeEnum.PUBLIC
	},
	{
		routes: sessionRoutes,
		template: GlobalLayout,
		type: RouteTypeEnum.SESSION
	},
	{
		routes: privateRoutes,
		template: PrivateLayout,
		type: RouteTypeEnum.PRIVATE
	}
];
export default routesTemplate;
