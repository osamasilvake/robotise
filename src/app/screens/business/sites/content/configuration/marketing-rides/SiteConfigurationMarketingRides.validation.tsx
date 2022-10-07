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
		activate: false,
		locations: [],
		times: []
	};

	const times = values.times?.reduce(
		(
			acc: SiteConfigurationMarketingRidesTimesInterface[],
			obj: SiteConfigurationMarketingRidesTimesInterface
		) => {
			if (!obj?.value) return acc;

			// format
			const condition1 = regexIntegerAndComma.test(obj.value);
			const condition2 = obj.value
				?.split(',')
				?.map((v) => {
					const cond1 = regexInteger.test(v);
					const cond2 = +v < 60;
					const cond3 = +v >= 0;
					return cond1 && cond2 && cond3;
				})
				.every((v) => v);

			if (!(condition1 && condition2)) {
				acc[obj.id] = { id: obj.id, value: `${translation}.INVALID` };
				return acc;
			}

			// duplicate
			const condition3 = obj.value?.split(',').every((e, i, a) => a.indexOf(e) === i);
			if (!condition3) {
				acc[obj.id] = { id: obj.id, value: `${translation}.DUPLICATE` };
				return acc;
			}

			// maximum entries
			const condition4 = obj.value?.split(',')?.length <= 4;
			if (!condition4) {
				acc[obj.id] = { id: obj.id, value: `${translation}.MAX_LIMIT_EXCEEDED` };
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
