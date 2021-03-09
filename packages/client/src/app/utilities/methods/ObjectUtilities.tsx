/**
 * gets the value at path of object.
 * note: If provided path does not exists inside the object js will generate error.
 * @param obj
 * @param path
 * @param defaultValue
 */
const get = <T,>(obj: any, path: T, defaultValue = undefined) => {
	const travel = (regexp: RegExp) =>
		String.prototype.split
			.call(path, regexp)
			.filter(Boolean)
			.reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
	const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
	return result === undefined || result === obj ? defaultValue : result;
};

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
	return Object.values(data).some((x) => x === null || x === '');
};

export { allPropertiesEmpty, get, somePropertiesEmpty };
