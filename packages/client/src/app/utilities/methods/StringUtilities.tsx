/**
 * pretty url pathname
 * @param str
 * @returns
 */
export const prettyUrlPathname = (str: string) => {
	return str
		.replace(/-/g, ' ')
		.toLowerCase()
		.replace(/\b[a-z]/g, (letter: string) => {
			return letter.toUpperCase();
		});
};
