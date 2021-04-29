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
	const errors: DialogCreateOrderPayloadInterface = {
		isDebug: false,
		location: '',
		mode: RobotOrderModeTypeEnum.MINI_BAR
	};

	// Location
	if (touched.location) {
		// required
		if (!values.location) {
			errors.location =
				'ROBOTS:CONTENT.ORDERS.LIST.ACTIONS.ORDER_CREATE.FIELDS.LOCATION.VALIDATIONS.REQUIRED';
		}

		// validate
		if (values.location && Number(values.location) < 0) {
			errors.location =
				'ROBOTS:CONTENT.ORDERS.LIST.ACTIONS.ORDER_CREATE.FIELDS.LOCATION.VALIDATIONS.INVALID';
		}
	}

	return errors;
};
