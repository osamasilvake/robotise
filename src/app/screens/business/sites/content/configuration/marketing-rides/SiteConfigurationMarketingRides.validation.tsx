import { AppConfigService } from '../../../../../../services';
import {
	SiteConfigurationMarketingRidesFormInterface,
	SiteConfigurationMarketingRidesTimesInterface
} from './SiteConfigurationMarketingRides.interface';

/**
 * validation
 * @param values
 */
export const SiteConfigurationMarketingRidesValidation = (
	values: SiteConfigurationMarketingRidesFormInterface
): SiteConfigurationMarketingRidesFormInterface => {
	const translation = 'CONTENT.CONFIGURATION.MARKETING_RIDES.FORM.FIELDS.MINUTES.VALIDATIONS';
	const regexMinutes = AppConfigService.AppOptions.regex.minutes;

	const times = values.times?.reduce(
		(
			acc: SiteConfigurationMarketingRidesTimesInterface[],
			obj: SiteConfigurationMarketingRidesTimesInterface
		) => {
			if (obj?.value) {
				const valid = regexMinutes.test(obj.value);
				acc[obj.id] = {
					id: obj.id,
					value: !valid ? `${translation}.INVALID` : ''
				};
				return acc;
			}
			return [];
		},
		[]
	);

	const errors: SiteConfigurationMarketingRidesFormInterface = {
		locations: [],
		times
	};

	return errors;
};
