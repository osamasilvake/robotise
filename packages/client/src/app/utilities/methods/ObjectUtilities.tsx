/**
 * validate empty object
 * @param data
 * @returns
 */
const validateEmptyObj = <T,>(data: T): boolean => {
	return Object.values(data).every((x) => x === null || x === '');
};

/**
 * validate empty property in the object
 * @param data
 * @returns
 */
const validateEmptyObjProperty = <T,>(data: T): boolean => {
	return Object.values(data).some((x) => x === null || x === '');
};

export { validateEmptyObj, validateEmptyObjProperty };
