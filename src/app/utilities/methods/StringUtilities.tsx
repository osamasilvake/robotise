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
 * convert url to link
 * @param text
 * @returns {*}
 */
export const strConvertUrlsToLinks = (text: string) => {
	// URLs starting with http://, https://, or ftp://
	const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
	let replacedText = text.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

	// urls starting with "www" (without // before it, or it'd re-link the ones done above).
	const replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
	replacedText = replacedText.replace(
		replacePattern2,
		'$1<a href="http://$2" target="_blank">$2</a>'
	);

	// change email addresses to "mailto::" links
	const replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
	replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

	return replacedText;
};
