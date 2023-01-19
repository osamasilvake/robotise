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
	const regexInteger = AppConfigService.AppOptions.regex.integer;
	const regexIntegerAndComma = AppConfigService.AppOptions.regex.integerAndComma;

	let errors: SiteConfigurationMarketingRidesFormInterface = {
		active: false,
		locations: [],
		weekdays: [],
		times: []
	};

	const times = values.times?.reduce(
		(
			acc: SiteConfigurationMarketingRidesTimesInterface[],
			obj: SiteConfigurationMarketingRidesTimesInterface
		) => {
			if (!obj?.minutes) return acc;

			// format
			const condition1 = regexIntegerAndComma.test(obj.minutes);
			const condition2 = obj.minutes
				?.split(',')
				?.map((v) => {
					const cond1 = regexInteger.test(v);
					const cond2 = +v < 60;
					const cond3 = +v >= 0;
					return cond1 && cond2 && cond3;
				})
				.every((v) => v);

			if (!(condition1 && condition2)) {
				acc[obj.hour] = { hour: obj.hour, minutes: `${translation}.INVALID` };
				return acc;
			}

			// duplicate
			const condition3 = obj.minutes?.split(',').every((e, i, a) => a.indexOf(e) === i);
			if (!condition3) {
				acc[obj.hour] = { hour: obj.hour, minutes: `${translation}.DUPLICATE` };
				return acc;
			}

			// maximum entries
			const condition4 = obj.minutes?.split(',')?.length <= 4;
			if (!condition4) {
				acc[obj.hour] = { hour: obj.hour, minutes: `${translation}.MAX_LIMIT_EXCEEDED` };
				return acc;
			}

			return acc;
		},
		[]
	);

	errors = {
		...errors,
		times
	};

	return errors;
};
