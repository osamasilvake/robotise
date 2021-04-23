/**
 * number format
 * @param value
 * @param currency
 * @param language
 * @returns
 */
export const currencyFormat = (value: number, currency: string, language: string) => {
	const formatter = new Intl.NumberFormat(language, {
		style: 'currency',
		currency
	});
	return formatter.format(value);
};
