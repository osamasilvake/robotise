import { SiteConfigFormInterface } from './SiteConfig.interface';

/**
 * site config validation
 * @param values
 * @param touched
 */
export const SiteConfigValidation = (
	values: SiteConfigFormInterface,
	touched: SiteConfigFormInterface
): SiteConfigFormInterface => {
	const translation = 'CONTENT.CONFIGURATION.SITE_CONFIG.FORM.FIELDS';
	const errors: SiteConfigFormInterface = {
		title: '',
		timezone: '',
		currency: '',
		availableOrderModes: [],
		orderOriginsEnabled: [],
		customerNotificationTypesEnabled: [],
		helpPage: ''
	};

	// Title
	if (touched.title) {
		// required
		if (!values.title) {
			errors.title = `${translation}.TITLE.VALIDATIONS.REQUIRED`;
		}
	}

	// Order Mode
	if (touched.availableOrderModes) {
		if (values.availableOrderModes.length < 1) {
			errors.availableOrderModes = [`${translation}.ORDER_MODE.VALIDATIONS.REQUIRED`];
		}
	}

	// Order Origins
	if (touched.orderOriginsEnabled) {
		if (values.orderOriginsEnabled.length < 1) {
			errors.orderOriginsEnabled = [`${translation}.ORDER_ORIGINS.VALIDATIONS.REQUIRED`];
		}
	}

	// Customer Notification Types
	if (touched.customerNotificationTypesEnabled) {
		if (values.customerNotificationTypesEnabled.length < 1) {
			errors.customerNotificationTypesEnabled = [
				`${translation}.CUSTOMER_NOTIFICATION_TYPES.VALIDATIONS.REQUIRED`
			];
		}
	}

	// Help Page
	if (touched.helpPage) {
		// required
		if (!values.helpPage) {
			errors.helpPage = `${translation}.HELP_PAGE.VALIDATIONS.REQUIRED`;
		}
	}

	return errors;
};
