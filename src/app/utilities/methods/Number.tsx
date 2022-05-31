import { AppConfigService } from '../../services';

/**
 * generate random number between min and max included
 * @param min
 * @param max
 * @returns
 */
const randomNum = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * currency format
 * @param value
 * @param currency
 * @param language
 * @returns
 */
const currencyFormat = (value: number, currency: string | undefined, language: string) => {
	const formatter = new Intl.NumberFormat(language, {
		style: 'currency',
		currency: currency || AppConfigService.AppOptions.common.currencies[0].id,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	return formatter.format(value);
};

/**
 * convert pixels to rem
 * @param size
 * @returns
 */
const pxToRem = (size: number): string => {
	return `${(size / 16) * 1}rem`;
};

/**
 * formats phone number to be easily readable
 * @param phone Phone number to beautify
 * @returns beautified phone number
 */
const formatPhoneNumber = (phone: string): string => {
	const match = phone.match(AppConfigService.AppOptions.regex.phoneNumberBeautifier);
	if (match) {
		return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
	}
	return '';
};

export { currencyFormat, formatPhoneNumber, pxToRem, randomNum };
