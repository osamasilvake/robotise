import Link from '@material-ui/core/Link';
import ReactDOMServer from 'react-dom/server';

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
	const link = (link: string, additional?: string, mail?: boolean) =>
		ReactDOMServer.renderToString(
			<Link underline="hover" href={mail ? `mailto:${link}` : link} target="_blank">
				{additional ? `${additional}${link}` : link}
			</Link>
		);

	// http://, https://, or ftp://
	const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
	let replacedText = text.replace(replacePattern1, link('$1'));

	// www, without //, re-link the ones done above
	const replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
	replacedText = replacedText.replace(replacePattern2, link('$2', '$1'));

	// change email addresses to "mailto:" links
	const replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
	replacedText = replacedText.replace(replacePattern3, link('$1', '', true));

	return replacedText;
};
