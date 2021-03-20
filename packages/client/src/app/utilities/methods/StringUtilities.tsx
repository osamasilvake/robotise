/**
 * remove special characters from string and replace with hyphen
 * @param str
 * @returns
 */
export const removeSpecialCharacters = (str: string): string => {
	return str.replace(/\W+/g, '-').replace(/-$/, '').toLowerCase();
};
