import Link from '@material-ui/core/Link';
import ReactDOMServer from 'react-dom/server';

import { AppConfigService } from '../../services';

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
 * convert to links
 * @param text
 * @returns {*}
 */
export const strToLinks = (text: string) => {
	const link = (link: string, additional?: boolean, mail?: boolean) =>
		ReactDOMServer.renderToString(
			<Link
				underline="hover"
				href={additional ? `http://${link}` : mail ? `mailto:${link}` : link}
				target="_blank"
				sx={{ color: AppConfigService.AppOptions.colors.c9 }}>
				{link}
			</Link>
		);

	// http://, https://, or ftp://
	const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
	let replacedText = text.replace(replacePattern1, link('$1'));

	// www, without //
	const replacePattern2 = /(www\.[\S]+(\b|$))/gim;
	replacedText = replacedText.replace(replacePattern2, link('$1', true));

	// change email addresses to "mailto:" links
	const replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
	replacedText = replacedText.replace(replacePattern3, link('$1', false, true));

	return replacedText;
};
