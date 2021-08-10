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
 * @param obj
 * @returns
 */
export const validateEmptyObj = <T,>(obj: T): boolean => {
	return obj && Object.values(obj).every((x) => x === null || x === '' || x === 0);
};

/**
 * validate empty property in the object
 * @param obj
 * @returns
 */
export const validateEmptyObjProperty = <T,>(obj: T): boolean => {
	return obj && Object.values(obj).some((x) => x === null || x === '' || x === 0);
};

/**
 * remove empty properties from the object
 * @param obj
 * @returns
 */
export const removeEmptyObjProperties = <T,>(obj: T) => {
	return Object.entries(obj)
		.filter(([, v]) => v !== null)
		.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
};
