/**
 * validate all empty properties in the data object
 * @param data
 * @returns
 */
const allPropertiesEmpty = <T,>(data: T): boolean => {
	return Object.values(data).every((x) => x === null || x === '');
};

/**
 * validate if some of the properties in the data object are empty
 * @param data
 * @returns
 */
const somePropertiesEmpty = <T,>(data: T): boolean => {
	return Object.values(data).some((x) => x === null || x === '');
};

export { allPropertiesEmpty, somePropertiesEmpty };
