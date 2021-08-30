import { AppConfigService } from '../../../../../../../services';
import { DialogCreateEditProductFormInterface } from './SiteProductsTable.interface';

/**
 * create/edit product validation
 * @param values
 * @param touched
 */
export const CreateEditProductValidation = (
	values: DialogCreateEditProductFormInterface,
	touched: DialogCreateEditProductFormInterface
): DialogCreateEditProductFormInterface => {
	const common = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.CREATE_EDIT.FIELDS';
	const regexMaxTwoDecimalPoints = AppConfigService.AppOptions.regex.maxTwoDecimalPoints;
	const errors: DialogCreateEditProductFormInterface = {
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
		(!values.length || Number(values.length) <= 0) &&
		(!values.weight || Number(values.weight) <= 0)
	) {
		errors.length = `${common}.LENGTH.VALIDATIONS.INVALID`;
		errors.weight = `${common}.WEIGHT.VALIDATIONS.INVALID`;
	}

	return errors;
};
