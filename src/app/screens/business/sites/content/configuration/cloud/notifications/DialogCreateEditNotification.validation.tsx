import { AppConfigService } from '../../../../../../../services';
import { DialogCreateEditNotificationFormInterface } from './SiteConfigurationNotifications.interface';

/**
 * create/edit notification validation
 * @param values
 * @param touched
 */
export const DialogCreateEditNotificationValidation = (
	values: DialogCreateEditNotificationFormInterface,
	touched: DialogCreateEditNotificationFormInterface
): DialogCreateEditNotificationFormInterface => {
	const translation = 'SITES:CONTENT.CONFIGURATION.NOTIFICATIONS.CREATE_EDIT.FORM.FIELDS';
	const regexEmail = AppConfigService.AppOptions.regex.email;
	const errors: DialogCreateEditNotificationFormInterface = {
		users: []
	};

	// Users
	if (touched.users) {
		// validate
		if (values.users.length) {
			errors.users = values.users.map((email) =>
				email && !regexEmail.test(email) ? `${translation}.EMAIL.VALIDATIONS.INVALID` : ''
			);
		}
	}

	return errors;
};
