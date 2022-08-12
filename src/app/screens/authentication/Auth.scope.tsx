import { AuthScopeInterface } from './Auth.interface';

/**
 * validate scope
 * @param payload
 * @returns
 */
export const validateScope = (payload: AuthScopeInterface): boolean => {
	const { authScopeType, authScope, scope, scopeName, link } = payload;
	const afterLastSlash = link?.split('/').pop();
	const attachTypeToValue = `${scopeName || afterLastSlash}:${authScopeType}`;
	return scope ? !!authScope?.includes(attachTypeToValue) : true;
};
