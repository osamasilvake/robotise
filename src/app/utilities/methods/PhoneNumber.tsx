import { AppConfigService } from '../../services';

/**
 * Formats phone number to be easily readable
 * @param phone Phone number to beautify
 * @returns beautified phone number
 */
const formatPhoneNumber = (phone: string): string => {
	const match = phone.match(AppConfigService.AppOptions.regex.phoneNumberBeautifier);

	if (match) {
		return match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4];
	}

	return '';
};

export { formatPhoneNumber };
