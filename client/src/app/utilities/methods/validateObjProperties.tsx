/**
 * validate all empty properties in the data object
 * @param data
 */
const allPropertiesEmpty = <T,>(data: T) => {
	return Object.values(data).every((x) => x === null || x === '');
};

/**
 * validate if some of the properties in the data object are empty
 * @param data
 */
const somePropertiesEmpty = <T,>(data: T) => {
	return Object.values(data).every((x) => x === null || x === '');
};

export { allPropertiesEmpty, somePropertiesEmpty };
