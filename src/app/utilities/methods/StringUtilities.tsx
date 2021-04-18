/**
 * remove special characters from string
 * @param str
 * @returns
 */
export const strRemoveSymbols = (str: string) => {
	return str.replaceAll(/[-_]/gi, ' ');
};

/**
 * capitalize each letter of the string
 * @param str
 * @returns
 */
export const strCapitalizeEachLetter = (str: string) => {
	return str.toLowerCase().replace(/\b[a-z]/g, (letter: string) => letter.toUpperCase());
};

/**
 * remove last underscore
 * @param str
 * @returns
 */
export const strRemoveLastUnderscore = (str: string) => {
	const pos = str.lastIndexOf('_');
	return str.substring(0, pos);
};
