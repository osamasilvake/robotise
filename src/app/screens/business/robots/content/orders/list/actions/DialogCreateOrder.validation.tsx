import { AppConfigService } from '../../../../../../../services';
import { RobotOrderModeTypeEnum } from './RobotOrdersActions.enum';
import { DialogCreateOrderPayloadInterface } from './RobotOrdersActions.interface';

/**
 * create order validation
 * @param values
 * @param touched
 */
export const CreateOrderValidation = (
	values: DialogCreateOrderPayloadInterface,
	touched: DialogCreateOrderPayloadInterface
): DialogCreateOrderPayloadInterface => {
	const common = 'ROBOTS:CONTENT.ORDERS.LIST.ACTIONS.CREATE';
	const errors: DialogCreateOrderPayloadInterface = {
		isDebug: false,
		location: '',
		mode: RobotOrderModeTypeEnum.MINI_BAR
	};

	// Location
	if (touched.location) {
		// required
		if (!values.location) {
			errors.location = `${common}.FIELDS.LOCATION.VALIDATIONS.REQUIRED`;
		}

		// validate
		if (!AppConfigService.AppOptions.regex.normalInteger.test(values.location)) {
			errors.location = `${common}.FIELDS.LOCATION.VALIDATIONS.INVALID`;
		}
	}

	return errors;
};
