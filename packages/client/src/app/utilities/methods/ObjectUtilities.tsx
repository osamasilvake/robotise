/**
 * validate empty object
 * @param data
 * @returns
 */
export const validateEmptyObj = <T,>(data: T): boolean => {
	return Object.values(data).every((x) => x === null || x === '');
};

/**
 * validate empty property in the object
 * @param data
 * @returns
 */
export const validateEmptyObjProperty = <T,>(data: T): boolean => {
	return Object.values(data).some((x) => x === null || x === '');
};
