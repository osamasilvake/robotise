import { DialogCreateSiteFormInterface } from './SitesActions.interface';

/**
 * create site validation
 * @param values
 * @param touched
 */
export const CreateSiteValidation = (
	values: DialogCreateSiteFormInterface,
	touched: DialogCreateSiteFormInterface
): DialogCreateSiteFormInterface => {
	const translation = 'SITES:LIST.ACTIONS.CREATE.FORM.FIELDS';
	const errors: DialogCreateSiteFormInterface = {
		title: '',
		timezone: '',
		currency: ''
	};

	// Title
	if (touched.title) {
		// required
		if (!values.title) {
			errors.title = `${translation}.TITLE.VALIDATIONS.REQUIRED`;
		}
	}

	return errors;
};
