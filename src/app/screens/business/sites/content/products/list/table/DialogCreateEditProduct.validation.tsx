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
	const translation = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.CREATE_EDIT.FIELDS';
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
			errors.name = `${translation}.NAME.VALIDATIONS.REQUIRED`;
		}
	}

	// Price
	if (touched.price) {
		// required
		if (!values.price) {
			errors.price = `${translation}.PRICE.VALIDATIONS.REQUIRED`;
		}

		// validate
		if (values.price && !regexMaxTwoDecimalPoints.test(String(values.price))) {
			errors.price = `${translation}.PRICE.VALIDATIONS.INVALID`;
		}
	}

	// Length/Weight
	if (
		(!values.length || Number(values.length) <= 0) &&
		(!values.weight || Number(values.weight) <= 0)
	) {
		errors.length = `${translation}.LENGTH.VALIDATIONS.INVALID`;
		errors.weight = `${translation}.WEIGHT.VALIDATIONS.INVALID`;
	}

	return errors;
};
