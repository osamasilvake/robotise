import { RouteTypeEnum } from '../Routes.enum';

/**
 * type: private
 * @param type
 */
export const isPrivate = (type: RouteTypeEnum) => type === RouteTypeEnum.PRIVATE;

/**
 * type: session
 * @param type
 */
export const isSession = (type: RouteTypeEnum) => type === RouteTypeEnum.SESSION;

/**
 * type: public
 * @param type
 */
export const isPublic = (type: RouteTypeEnum) => type === RouteTypeEnum.PUBLIC;
