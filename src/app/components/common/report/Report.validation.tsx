import { momentFromToDiff } from '../../../utilities/methods/Moment';
import { ReportFormInterface } from './Report.interface';

/**
 * report validation
 * @param values
 * @param touched
 */
export const ReportValidation = (
	values: ReportFormInterface,
	touched: ReportFormInterface
): ReportFormInterface => {
	const errors: ReportFormInterface = {
		from: '',
		to: ''
	};

	// From and To
	if (touched.to && touched.from) {
		// exceeds
		if (momentFromToDiff(values.from, values.to)) {
			errors.from = `FROM.VALIDATIONS.EXCEEDS`;
		}
	}

	return errors;
};
