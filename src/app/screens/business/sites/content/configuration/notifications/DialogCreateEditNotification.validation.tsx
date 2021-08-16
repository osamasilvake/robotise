import { AppConfigService } from '../../../../../../services';
import { DialogCreateEditNotificationFormInterface } from './SiteNotifications.interface';

/**
 * create/edit notification validation
 * @param values
 * @param touched
 */
export const DialogCreateEditNotificationValidation = (
	values: DialogCreateEditNotificationFormInterface,
	touched: DialogCreateEditNotificationFormInterface
): DialogCreateEditNotificationFormInterface => {
	const common = 'SITES:CONTENT.CONFIGURATION.NOTIFICATIONS.LIST.CREATE_EDIT.FIELDS';
	const regexEmail = AppConfigService.AppOptions.regex.email;
	const errors: DialogCreateEditNotificationFormInterface = {
		users: []
	};

	// Users
	if (touched.users) {
		// validate
		if (values.users.length) {
			errors.users = values.users.map((email) =>
				email && !regexEmail.test(email) ? `${common}.EMAIL.VALIDATIONS.INVALID` : ''
			);
		}
	}

	return errors;
};
