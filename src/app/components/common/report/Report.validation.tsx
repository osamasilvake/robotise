import { dateFromToDiff } from '../../../utilities/methods/Date';
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
		id: '',
		from: '',
		to: ''
	};

	// From and To
	if (touched.to && touched.from) {
		// exceeds
		if (dateFromToDiff(values.from, values.to)) {
			errors.from = `FROM.VALIDATIONS.EXCEEDS`;
		}
	}

	return errors;
};
