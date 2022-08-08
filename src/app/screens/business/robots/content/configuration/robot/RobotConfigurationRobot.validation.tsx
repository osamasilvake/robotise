import { RCCDataElementInterface } from '../../../../../../slices/business/robots/configuration/robot-configuration/RobotConfiguration.slice.interface';

/**
 * login validation
 * @param values
 */
export const RobotConfigurationRobotValidation = (
	values: RCCDataElementInterface
): RCCDataElementInterface => {
	const translation = 'CONTENT.CONFIGURATION.ROBOT_CONFIGURATION.FORM.FIELD.VALIDATIONS';

	const errors: RCCDataElementInterface = Object.entries(values)?.reduce(
		(acc, [k, v]) => (v ? acc : { ...acc, [k]: `${translation}.REQUIRED` }),
		{}
	);
	return errors;
};
