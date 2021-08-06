/**
 * percentage
 * @param value
 * @param precision
 * @returns
 */
export const percentage = (value: number, precision = 0) => {
	let result;
	try {
		result = (value * 100).toFixed(precision);
	} catch (error) {
		result = value;
	}
	return `${result}%`;
};
