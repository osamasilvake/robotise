import { validateEmail } from '../../../../../../utilities/methods/Validations';
import { DialogCreateEditNotificationPayloadInterface } from './SiteNotifications.interface';

/**
 * create/edit notification validation
 * @param values
 * @param touched
 */
export const DialogCreateEditNotificationValidation = (
	values: DialogCreateEditNotificationPayloadInterface,
	touched: DialogCreateEditNotificationPayloadInterface
): DialogCreateEditNotificationPayloadInterface => {
	const common = 'SITES:CONTENT.PRODUCTS.LIST.ACTIONS.CREATE_EDIT.FIELDS';
	const errors: DialogCreateEditNotificationPayloadInterface = {
		users: []
	};

	// Users
	if (touched.users) {
		// validate
		if (values.users.length) {
			errors.users = values.users.map((email) =>
				email && !validateEmail(email) ? `${common}.EMAIL.VALIDATIONS.REQUIRED` : ''
			);
		}
	}

	return errors;
};
