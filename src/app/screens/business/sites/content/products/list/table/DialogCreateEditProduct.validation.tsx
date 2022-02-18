import { AppConfigService } from '../../../../../../../services';
import { SiteProductCreateEditLengthValidationTypeEnum } from './SiteProductsTable.enum';
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
	const lengthEnum = SiteProductCreateEditLengthValidationTypeEnum;
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

	// Length
	if (touched.length) {
		// min
		if ((values.length || 0) < lengthEnum.MIN) {
			errors.length = `${translation}.LENGTH.VALIDATIONS.MIN`;
		}
		//max
		if ((values.length || 0) > lengthEnum.MAX) {
			errors.length = `${translation}.LENGTH.VALIDATIONS.MAX`;
		}
	}

	// Length/Weight
	if ((!values.length || +values.length <= 0) && (!values.weight || +values.weight <= 0)) {
		errors.length = `${translation}.LENGTH.VALIDATIONS.INVALID`;
		errors.weight = `${translation}.WEIGHT.VALIDATIONS.INVALID`;
	}

	return errors;
};
