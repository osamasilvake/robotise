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
	const errors: DialogCreateEditProductPayloadInterface = {
		image: '',
		name: '',
		price: 0,
		length: 0,
		weight: 0,
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

		// max two decimal points
		if (
			values.price &&
			!AppConfigService.AppOptions.regex.maxTwoDecimalPoints.test(String(values.price))
		) {
			errors.price = `${common}.PRICE.VALIDATIONS.INVALID`;
		}
	}

	return errors;
};
