import { AuthScopeTypeEnum } from './Auth.enum';

/**
 * validate scope
 * @param scope
 * @param link
 * @param type
 * @returns
 */
export const validateScope = (
	scope: string | undefined,
	link: string,
	type: AuthScopeTypeEnum
): boolean => !!scope?.includes(`${link.substring(1)}:${type}`);
