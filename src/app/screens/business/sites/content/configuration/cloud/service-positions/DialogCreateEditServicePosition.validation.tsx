import { DialogCreateEditServicePositionFormInterface } from './SiteConfigurationServicePositions.interface';

/**
 * create/edit service position validation
 * @param values
 * @param touched
 */
export const DialogCreateEditServicePositionValidation = (
	values: DialogCreateEditServicePositionFormInterface,
	touched: DialogCreateEditServicePositionFormInterface
): DialogCreateEditServicePositionFormInterface => {
	const translation = 'SITES:CONTENT.CONFIGURATION.SERVICE_POSITIONS.CREATE_EDIT.FORM.FIELDS';
	const errors: DialogCreateEditServicePositionFormInterface = {
		name: '',
		location: ''
	};

	// Name
	if (touched.name) {
		// required
		if (!values.name) {
			errors.name = `${translation}.NAME.VALIDATIONS.REQUIRED`;
		}
	}

	// LOCATION
	if (touched.location) {
		// required
		if (!values.location) {
			errors.location = `${translation}.LOCATION.VALIDATIONS.REQUIRED`;
		}
	}

	return errors;
};
