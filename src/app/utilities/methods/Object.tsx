/**
 * serialize the object
 * @param obj
 * @returns
 */
const serializeObj = <T extends object>(obj: T): string => {
	return Object.entries(obj)
		.map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
		.join('&');
};

/**
 * validate empty object
 * @param obj
 * @returns
 */
const validateEmptyObj = <T extends object>(obj: T): boolean => {
	return (
		obj && Object.values(obj).every((x) => x === null || x === '' || x === 0 || x.length === 0)
	);
};

/**
 * validate empty property in the object
 * @param obj
 * @returns
 */
const validateEmptyObjProperty = <T extends object>(obj: T): boolean => {
	return (
		obj && Object.values(obj)?.some((x) => x === null || x === '' || x === 0 || x.length === 0)
	);
};

/**
 * remove empty properties from the object
 * @param obj
 * @returns
 */
const removeEmptyObjProperties = <T extends object>(obj: T) => {
	return Object.entries(obj)
		.filter(([, x]) => x !== null && x !== '')
		.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}) as T;
};

export { removeEmptyObjProperties, serializeObj, validateEmptyObj, validateEmptyObjProperty };
