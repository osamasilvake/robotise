/**
 * stringify json
 * @param value
 */
const jsonStringify = <T,>(value: T) => {
	return JSON.stringify(value, null, 4);
};

/**
 * parse json
 * @param value
 */
const jsonParse = (value: string) => {
	return JSON.parse(value);
};

export { jsonParse, jsonStringify };
