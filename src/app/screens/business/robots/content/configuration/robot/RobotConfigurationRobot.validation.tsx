import { RCCDataElementInterface } from '../../../../../../slices/business/robots/configuration/robot/RobotConfiguration.slice.interface';

/**
 * validation
 * @param values
 */
export const RobotConfigurationRobotValidation = (
	values: RCCDataElementInterface
): RCCDataElementInterface => {
	const translation = 'CONTENT.CONFIGURATION.ROBOT.FORM.FIELDS.VALIDATIONS';

	const errors: RCCDataElementInterface = Object.entries(values)?.reduce(
		(acc, [k, v]) => (v ? acc : { ...acc, [k]: `${translation}.REQUIRED` }),
		{}
	);
	return errors;
};
