import { DialogCreateRobotFormInterface } from './RobotsActions.interface';

/**
 * create robot validation
 * @param values
 * @param touched
 */
export const CreateRobotValidation = (
	values: DialogCreateRobotFormInterface,
	touched: DialogCreateRobotFormInterface
): DialogCreateRobotFormInterface => {
	const translation = 'ROBOTS:LIST.ACTIONS.CREATE.FORM.FIELDS';
	const errors: DialogCreateRobotFormInterface = {
		siteId: '',
		name: '',
		customerName: ''
	};

	// Name
	if (touched.name) {
		// required
		if (!values.name) {
			errors.name = `${translation}.NAME.VALIDATIONS.REQUIRED`;
		}
	}

	// Customer Name
	if (touched.customerName) {
		// required
		if (!values.customerName) {
			errors.customerName = `${translation}.CUSTOMER_NAME.VALIDATIONS.REQUIRED`;
		}
	}

	return errors;
};
