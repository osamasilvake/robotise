/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * serialize the object
 * @param obj
 * @returns
 */
export const serialize = <T,>(obj: T): string => {
	const str = [];
	for (const p in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, p)) {
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent((obj as any)[p]));
		}
	}
	return str.join('&');
};
