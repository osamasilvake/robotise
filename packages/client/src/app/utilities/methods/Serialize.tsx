/**
 * serialize the object
 * @param obj
 */
export const serialize = <T extends Record<string, string>>(obj: T) => {
	const str = [];
	for (const p in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, p)) {
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
		}
	}
	return str.join('&');
};
