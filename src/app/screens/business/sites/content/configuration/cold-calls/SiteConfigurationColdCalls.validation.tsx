import { AppConfigService } from '../../../../../../services';
import {
	dateDayJs,
	dateIsAfter,
	dateIsBefore,
	dateIsSame
} from '../../../../../../utilities/methods/Date';
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

	const dateStart = dateDayJs(`2000-01-01 ${values.startTimeLocal}`).toDate();
	const dateEnd = dateDayJs(`2000-01-01 ${values.endTimeLocal}`).toDate();

	// Start Time
	if (touched.startTimeLocal) {
		if (!values.startTimeLocal) {
			errors.startTimeLocal = `${translation}.START_TIME.VALIDATIONS.REQUIRED`;
		} else if (!regexTime.test(values.startTimeLocal)) {
			errors.startTimeLocal = `${translation}.START_TIME.VALIDATIONS.INVALID`;
		} else if (dateIsAfter(dateStart, dateEnd)) {
			errors.startTimeLocal = `${translation}.START_TIME.VALIDATIONS.AFTER_TIME`;
		} else if (dateIsSame(dateStart, dateEnd)) {
			errors.startTimeLocal = `${translation}.START_TIME.VALIDATIONS.SAME_TIME`;
		}
	}

	// End Time
	if (touched.endTimeLocal) {
		if (!values.endTimeLocal) {
			errors.endTimeLocal = `${translation}.END_TIME.VALIDATIONS.REQUIRED`;
		} else if (!regexTime.test(values.endTimeLocal)) {
			errors.endTimeLocal = `${translation}.END_TIME.VALIDATIONS.INVALID`;
		} else if (dateIsBefore(dateEnd, dateStart)) {
			errors.endTimeLocal = `${translation}.END_TIME.VALIDATIONS.BEFORE_TIME`;
		} else if (dateIsSame(dateStart, dateEnd)) {
			errors.endTimeLocal = `${translation}.END_TIME.VALIDATIONS.SAME_TIME`;
		}
	}

	return errors;
};
