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
	const regexInteger = AppConfigService.AppOptions.regex.integer;
	const errors: DialogCreateOrderFormInterface = {
		isDebug: false,
		locationId: '',
		mode: '',
		phone: ''
	};

	// Phone
	if (touched.phone && values.phone) {
		// invalid
		if (!regexInteger.test(values.phone)) {
			errors.phone = `${translation}.PHONE.VALIDATIONS.INVALID`;
		}
	}

	return errors;
};
