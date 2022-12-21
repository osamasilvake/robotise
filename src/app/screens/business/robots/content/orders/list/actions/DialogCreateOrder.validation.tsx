import { AppConfigService } from '../../../../../../../services';
import { DialogCreateOrderFormInterface } from './RobotOrdersActions.interface';

/**
 * create order validation
 * @param values
 * @param touched
 */
export const CreateOrderValidation = (
	values: DialogCreateOrderFormInterface,
	touched: DialogCreateOrderFormInterface
): DialogCreateOrderFormInterface => {
	const translation = 'GENERAL:COMMON.ORDERS.LIST.ACTIONS.CREATE.FORM.FIELDS';
	const regexIntegersAndChars = AppConfigService.AppOptions.regex.integersAndChars;
	const regexInteger = AppConfigService.AppOptions.regex.integer;
	const errors: DialogCreateOrderFormInterface = {
		isDebug: false,
		location: '',
		mode: '',
		phone: ''
	};

	// Location
	if (touched.location) {
		// required
		if (!values.location) {
			errors.location = `${translation}.LOCATION.VALIDATIONS.REQUIRED`;
		}

		// validate
		if (values.location && !regexIntegersAndChars.test(values.location)) {
			errors.location = `${translation}.LOCATION.VALIDATIONS.INVALID`;
		}
	}

	// Phone
	if (touched.phone && values.phone) {
		// invalid
		if (!regexInteger.test(values.phone)) {
			errors.phone = `${translation}.PHONE.VALIDATIONS.INVALID`;
		}
	}

	return errors;
};
