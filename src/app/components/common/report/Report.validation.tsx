import { momentFromToDiff } from '../../../utilities/methods/Moment';
import { ReportPayloadInterface } from './Report.interface';

/**
 * report validation
 * @param values
 * @param touched
 */
export const ReportValidation = (
	values: ReportPayloadInterface,
	touched: ReportPayloadInterface
): ReportPayloadInterface => {
	const errors: ReportPayloadInterface = {
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
