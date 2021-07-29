/**
 * serialize the object
 * @param obj
 * @returns
 */
export const serializeObj = <T,>(obj: T): string => {
	return Object.entries(obj)
		.map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
		.join('&');
};

/**
 * validate empty object
 * @param data
 * @returns
 */
export const validateEmptyObj = <T,>(data: T): boolean => {
	return data && Object.values(data).every((x) => x === null || x === '' || x === 0);
};

/**
 * validate empty property in the object
 * @param data
 * @returns
 */
export const validateEmptyObjProperty = <T,>(data: T): boolean => {
	return data && Object.values(data).some((x) => x === null || x === '' || x === 0);
};
