import { AppConfigService } from '../../../../../../../services';
import { RobotOrderModeTypeEnum } from './RobotOrdersActions.enum';
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
	const translation = 'ROBOTS:CONTENT.ORDERS.LIST.ACTIONS.CREATE';
	const regexNormalInteger = AppConfigService.AppOptions.regex.normalInteger;
	const errors: DialogCreateOrderFormInterface = {
		isDebug: false,
		location: '',
		mode: RobotOrderModeTypeEnum.MINI_BAR
	};

	// Location
	if (touched.location) {
		// required
		if (!values.location) {
			errors.location = `${translation}.FIELDS.LOCATION.VALIDATIONS.REQUIRED`;
		}

		// validate
		if (!regexNormalInteger.test(values.location)) {
			errors.location = `${translation}.FIELDS.LOCATION.VALIDATIONS.INVALID`;
		}
	}

	return errors;
};
