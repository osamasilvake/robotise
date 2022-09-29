/**
 * validate array
 * @param list
 * @returns
 */
export const isArray = <T,>(list: T): boolean => {
	return !!list && list.constructor === Array;
};
