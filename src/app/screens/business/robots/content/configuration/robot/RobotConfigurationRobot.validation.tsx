import { RobotConfigurationRobotFormInterface } from './RobotConfigurationRobot.interface';

/**
 * login validation
 * @param values
 */
export const RobotConfigurationRobotValidation = (
	values: RobotConfigurationRobotFormInterface
): RobotConfigurationRobotFormInterface => {
	const translation = 'CONTENT.CONFIGURATION.ROBOT_CONFIGURATION.FORM.FIELD.VALIDATIONS';

	const errors: RobotConfigurationRobotFormInterface = Object.entries(values)?.reduce(
		(acc, [k, v]) => (v ? acc : { ...acc, [k]: `${translation}.REQUIRED` }),
		{}
	);
	return errors;
};
