import { AuthScopeTypeEnum } from './Auth.enum';

/**
 * validate scope
 * @param authScope
 * @param authScopeType
 * @param itemLink
 * @param itemScope
 * @returns
 */
export const validateScope = (
	authScope: string | undefined,
	authScopeType: AuthScopeTypeEnum,
	itemLink: string,
	itemScope = false
): boolean => {
	const afterLastSlash = itemLink.split('/').pop();
	const attachTypeToValue = `${afterLastSlash}:${authScopeType}`;
	return itemScope ? !!authScope?.includes(attachTypeToValue) : true;
};
