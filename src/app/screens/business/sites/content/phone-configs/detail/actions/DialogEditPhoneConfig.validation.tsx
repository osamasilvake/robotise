import { AppConfigService } from '../../../../../../../services';
import { DialogEditPhoneConfigFormInterface } from '../general/SitePhoneConfigsGeneral.interface';

/**
 * edit phone config validation
 * @param values
 * @param touched
 */
export const EditPhoneConfigValidation = (
	values: DialogEditPhoneConfigFormInterface,
	touched: DialogEditPhoneConfigFormInterface
): DialogEditPhoneConfigFormInterface => {
	const translation = 'SITES:CONTENT.PHONE_CONFIGS.DETAIL.ACTIONS.EDIT';
	const regexInteger = AppConfigService.AppOptions.regex.integer;
	const regexPhoneCommaSeparated = AppConfigService.AppOptions.regex.phoneNumbersCommaSeparated;
	const regexPhone = AppConfigService.AppOptions.regex.phoneNumber;
	const errors: DialogEditPhoneConfigFormInterface = {
		prefixes: '',
		from: '',
		mode: '',
		outboundPattern: '',
		callbackRetries: '',
		smsGateway: ''
	};

	// Prefixes
	if (touched.prefixes) {
		// required
		if (!values.prefixes) {
			errors.prefixes = `${translation}.FIELDS.PREFIXES.VALIDATIONS.REQUIRED`;
		}

		// invalid
		if (values.prefixes && !regexPhoneCommaSeparated.test(values.prefixes)) {
			errors.prefixes = `${translation}.FIELDS.PREFIXES.VALIDATIONS.INVALID`;
		}
	}

	// From
	if (touched.from) {
		// required
		if (!values.from) {
			errors.from = `${translation}.FIELDS.FROM.VALIDATIONS.REQUIRED`;
		}

		// invalid
		if (values.from && !regexPhone.test(values.from)) {
			errors.from = `${translation}.FIELDS.FROM.VALIDATIONS.INVALID`;
		}
	}

	// Callback Retries
	if (touched.callbackRetries) {
		// required
		if (!regexInteger.test(values.callbackRetries) && +values.callbackRetries < 0) {
			errors.callbackRetries = `${translation}.FIELDS.CALLBACK_RETRIES.VALIDATIONS.REQUIRED`;
		}

		// limit exceeds
		if (+values.callbackRetries > 10) {
			errors.callbackRetries = `${translation}.FIELDS.CALLBACK_RETRIES.VALIDATIONS.LIMIT_EXCEEDED`;
		}
	}

	// SMS Gateway
	if (touched.smsGateway) {
		// invalid
		if (values.smsGateway && !regexPhone.test(values.smsGateway)) {
			errors.smsGateway = `${translation}.FIELDS.SMS_GATEWAY.VALIDATIONS.INVALID`;
		}
	}

	return errors;
};
