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
): boolean => {
	const afterLastSlash = link.split('/').pop();
	const attachTypeToValue = `${afterLastSlash}:${type}`;
	return !!scope?.includes(attachTypeToValue);
};
