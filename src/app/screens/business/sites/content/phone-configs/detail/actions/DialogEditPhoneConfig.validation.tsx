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
	const translation = 'SITES:CONTENT.PHONE_CONFIGS.DETAIL.ACTIONS.EDIT';
	const regexInteger = AppConfigService.AppOptions.regex.integer;
	const regexPhoneCommaSeparated = AppConfigService.AppOptions.regex.phoneNumbersCommaSeparated;
	const regexRoomsMapping = AppConfigService.AppOptions.regex.roomsMapping;
	const errors: DialogEditPhoneConfigFormInterface = {
		mode: '',
		prefixes: '',
		from: '',
		roomsMapping: '',
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

	// Rooms Mapping
	if (touched.roomsMapping && values.roomsMapping) {
		// invalid
		if (values.roomsMapping && !regexRoomsMapping.test(values.roomsMapping as string)) {
			errors.roomsMapping = `${translation}.FIELDS.ROOMS_MAPPING.VALIDATIONS.INVALID`;
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

	return errors;
};
