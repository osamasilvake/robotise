import { momentFromToDiff } from '../../../../../../../utilities/methods/Moment';
import { DialogProductsReportPayloadInterface } from './SiteProductsActions.interface';

/**
 * products report validation
 * @param values
 * @param touched
 */
export const ProductsReportValidation = (
	values: DialogProductsReportPayloadInterface,
	touched: DialogProductsReportPayloadInterface
): DialogProductsReportPayloadInterface => {
	const common = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.PRODUCTS_REPORT.FIELDS';
	const errors: DialogProductsReportPayloadInterface = {
		from: '',
		to: ''
	};

	// From and To
	if (touched.to && touched.from) {
		// exceeds
		if (momentFromToDiff(values.from, values.to)) {
			errors.from = `${common}.FROM.VALIDATIONS.EXCEEDS`;
		}
	}

	return errors;
};
