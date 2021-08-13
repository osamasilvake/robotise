import { RobotConfigFormInterface } from './RobotConfig.interface';

/**
 * robot config validation
 * @param values
 * @param touched
 */
export const RobotConfigValidation = (
	values: RobotConfigFormInterface,
	touched: RobotConfigFormInterface
): RobotConfigFormInterface => {
	const common = 'CONTENT.CONFIGURATION.ROBOT_CONFIG.FORM.FIELDS';
	const errors: RobotConfigFormInterface = {
		name: '',
		customerName: ''
	};

	// Name
	if (touched.name) {
		// required
		if (!values.name) {
			errors.name = `${common}.NAME.VALIDATIONS.REQUIRED`;
		}
	}

	// Customer Name
	if (touched.customerName) {
		// required
		if (!values.customerName) {
			errors.customerName = `${common}.CUSTOMER_NAME.VALIDATIONS.REQUIRED`;
		}
	}

	return errors;
};
