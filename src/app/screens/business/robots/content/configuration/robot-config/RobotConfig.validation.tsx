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
	const translation = 'CONTENT.CONFIGURATION.ROBOT_CONFIG.FORM.FIELDS';
	const errors: RobotConfigFormInterface = {
		name: '',
		customerName: '',
		username: '',
		ipAddress: ''
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

	// Username
	if (touched.username) {
		// required
		if (!values.username) {
			errors.username = `${translation}.USERNAME.VALIDATIONS.REQUIRED`;
		}
	}

	// IP Address
	if (touched.ipAddress) {
		// required
		if (!values.ipAddress) {
			errors.ipAddress = `${translation}.IP_ADDRESS.VALIDATIONS.REQUIRED`;
		}
	}

	return errors;
};
