import { RouteTypeEnum } from '../Routes.enum';

export const isPrivate = (routeType: RouteTypeEnum) => routeType === RouteTypeEnum.PRIVATE;
export const isSession = (routeType: RouteTypeEnum) => routeType === RouteTypeEnum.SESSION;
export const isPublic = (routeType: RouteTypeEnum) => routeType === RouteTypeEnum.PUBLIC;
