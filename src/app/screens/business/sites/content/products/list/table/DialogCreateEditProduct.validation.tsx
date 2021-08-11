import { AppConfigService } from '../../../../../../../services';
import { DialogCreateEditProductPayloadInterface } from './SiteProductsTable.interface';

/**
 * create/edit product validation
 * @param values
 * @param touched
 */
export const CreateEditProductValidation = (
	values: DialogCreateEditProductPayloadInterface,
	touched: DialogCreateEditProductPayloadInterface
): DialogCreateEditProductPayloadInterface => {
	const common = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.CREATE_EDIT.FIELDS';
	const regexMaxTwoDecimalPoints = AppConfigService.AppOptions.regex.maxTwoDecimalPoints;
	const regexZeroInString = AppConfigService.AppOptions.regex.zeroInString;
	const errors: DialogCreateEditProductPayloadInterface = {
		image: '',
		name: '',
		price: '',
		length: '',
		weight: '',
		volume: ''
	};

	// Name
	if (touched.name) {
		// required
		if (!values.name) {
			errors.name = `${common}.NAME.VALIDATIONS.REQUIRED`;
		}
	}

	// Price
	if (touched.price) {
		// required
		if (!values.price) {
			errors.price = `${common}.PRICE.VALIDATIONS.REQUIRED`;
		}

		// validate
		if (values.price && !regexMaxTwoDecimalPoints.test(String(values.price))) {
			errors.price = `${common}.PRICE.VALIDATIONS.INVALID`;
		}
	}

	// Length/Weight
	if (
		(!values.length || regexZeroInString.test(String(values.length))) &&
		(!values.weight || regexZeroInString.test(String(values.weight)))
	) {
		errors.length = `${common}.LENGTH.VALIDATIONS.INVALID`;
		errors.weight = `${common}.WEIGHT.VALIDATIONS.INVALID`;
	}

	return errors;
};
