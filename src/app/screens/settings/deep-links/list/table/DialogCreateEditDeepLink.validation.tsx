import { DialogCreateEditDeepLinkFormInterface } from './DeepLinksTable.interface';

/**
 * create/edit deep link validation
 * @param values
 * @param touched
 */
export const CreateEditDeepLinkValidation = (
	values: DialogCreateEditDeepLinkFormInterface,
	touched: DialogCreateEditDeepLinkFormInterface
): DialogCreateEditDeepLinkFormInterface => {
	const translation = 'DEEP_LINKS:LIST.ACTIONS.CREATE_EDIT.FIELDS';
	const errors: DialogCreateEditDeepLinkFormInterface = {
		name: '',
		description: '',
		key: '',
		link: ''
	};

	// Name
	if (touched.name) {
		// required
		if (!values.name) {
			errors.name = `${translation}.NAME.VALIDATIONS.REQUIRED`;
		}
	}

	// Description
	if (touched.description) {
		// required
		if (!values.description) {
			errors.description = `${translation}.DESCRIPTION.VALIDATIONS.REQUIRED`;
		}
	}

	// Key
	if (touched.key) {
		// required
		if (!values.key) {
			errors.key = `${translation}.KEY.VALIDATIONS.REQUIRED`;
		}
	}

	// Link
	if (touched.link) {
		// required
		if (!values.link) {
			errors.link = `${translation}.LINK.VALIDATIONS.REQUIRED`;
		}
	}

	return errors;
};
