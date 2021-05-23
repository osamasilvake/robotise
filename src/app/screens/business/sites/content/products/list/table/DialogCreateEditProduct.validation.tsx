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
	const commonText = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.PRODUCT_CREATE_EDIT.FIELDS';
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
			errors.name = `${commonText}.NAME.VALIDATIONS.REQUIRED`;
		}
	}

	// Price
	if (touched.price) {
		// required
		if (!values.price) {
			errors.price = `${commonText}.PRICE.VALIDATIONS.REQUIRED`;
		}
	}

	return errors;
};
