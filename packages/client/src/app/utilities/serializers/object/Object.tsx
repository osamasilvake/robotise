/**
 * serialize the object
 * @param obj
 * @returns
 */
export const serialize = <T,>(obj: T): string => {
	return Object.entries(obj)
		.map(([key, val]) => `${key}=${val}`)
		.join('&');
};
