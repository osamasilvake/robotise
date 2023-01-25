import { AppConfigService } from '../../../../../../services';
import { dateIsAfter } from '../../../../../../utilities/methods/Date';
import { SiteConfigurationColdCallsFormInterface } from './SiteConfigurationColdCalls.interface';

/**
 * validation
 * @param values
 */
export const SiteConfigurationColdCallsValidation = (
	values: SiteConfigurationColdCallsFormInterface,
	touched: SiteConfigurationColdCallsFormInterface
): SiteConfigurationColdCallsFormInterface => {
	const translation = 'CONTENT.CONFIGURATION.COLD_CALLS.FORM.FIELDS';
	const regexTime = AppConfigService.AppOptions.regex.time;
	const errors: SiteConfigurationColdCallsFormInterface = {
		enabled: false,
		startTimeLocal: '',
		endTimeLocal: '',
		days: []
	};

	// Start Time
	if (touched.startTimeLocal) {
		if (!values.startTimeLocal) {
			errors.startTimeLocal = `${translation}.START_TIME.VALIDATIONS.REQUIRED`;
		} else if (!regexTime.test(values.startTimeLocal)) {
			errors.startTimeLocal = `${translation}.START_TIME.VALIDATIONS.INVALID`;
		} else if (dateIsAfter(values.startTimeLocal, values.endTimeLocal)) {
			errors.startTimeLocal = `${translation}.END_TIME.VALIDATIONS.NOT_ALLOWED`;
		}
	}

	// End Time
	if (touched.endTimeLocal) {
		if (!values.endTimeLocal) {
			errors.endTimeLocal = `${translation}.END_TIME.VALIDATIONS.REQUIRED`;
		} else if (!regexTime.test(values.endTimeLocal)) {
			errors.endTimeLocal = `${translation}.END_TIME.VALIDATIONS.INVALID`;
		}
	}

	return errors;
};
