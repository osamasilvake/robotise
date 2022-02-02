import { AuthScopeTypeEnum } from './Auth.enum';

/**
 * validate scope
 * @param authScope
 * @param authScopeType
 * @param link
 * @param scope
 * @param scopeName
 * @returns
 */
export const validateScope = (
	authScope: string | undefined,
	authScopeType: AuthScopeTypeEnum,
	link: string | undefined,
	scope = false,
	scopeName?: string
): boolean => {
	const afterLastSlash = link?.split('/').pop();
	const attachTypeToValue = `${scopeName || afterLastSlash}:${authScopeType}`;
	return scope ? !!authScope?.includes(attachTypeToValue) : true;
};
