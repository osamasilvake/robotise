import { AppConfigService } from '../../../../../../../services';
import { DialogEditPhoneConfigFormInterface } from './SitePhoneConfigsEdit.interface';

/**
 * edit phone config validation
 * @param values
 * @param touched
 */
export const EditPhoneConfigValidation = (
	values: DialogEditPhoneConfigFormInterface,
	touched: DialogEditPhoneConfigFormInterface
): DialogEditPhoneConfigFormInterface => {
	const translation = 'SITES:CONTENT.PHONE_CONFIGS.DETAIL.ACTIONS.EDIT.FORM.FIELDS';
	const regexInteger = AppConfigService.AppOptions.regex.integer;
	const regexPhoneCommaSeparated = AppConfigService.AppOptions.regex.phoneNumbersCommaSeparated;
	const errors: DialogEditPhoneConfigFormInterface = {
		mode: '',
		prefixes: '',
		from: '',
		outboundPattern: '',
		callbackRetries: '',
		smsGateway: ''
	};

	// Prefixes
	if (touched.prefixes && values.prefixes) {
		// invalid
		if (values.prefixes && !regexPhoneCommaSeparated.test(values.prefixes)) {
			errors.prefixes = `${translation}.PREFIXES.VALIDATIONS.INVALID`;
		}
	}

	// Callback Retries
	if (touched.callbackRetries) {
		// required
		if (!regexInteger.test(values.callbackRetries) && +values.callbackRetries < 0) {
			errors.callbackRetries = `${translation}.CALLBACK_RETRIES.VALIDATIONS.REQUIRED`;
		}

		// limit exceeds
		if (+values.callbackRetries > 10) {
			errors.callbackRetries = `${translation}.CALLBACK_RETRIES.VALIDATIONS.LIMIT_EXCEEDED`;
		}
	}

	return errors;
};
