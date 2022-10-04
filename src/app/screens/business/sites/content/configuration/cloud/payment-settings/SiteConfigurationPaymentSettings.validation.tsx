import { SiteConfigurationPaymentSettingsFormInterface } from './SiteConfigurationPaymentSettings.interface';

/**
 * payment settings validation
 * @param values
 * @param touched
 */
export const SiteConfigurationPaymentSettingsValidation = (
	values: SiteConfigurationPaymentSettingsFormInterface,
	touched: SiteConfigurationPaymentSettingsFormInterface
): SiteConfigurationPaymentSettingsFormInterface => {
	const translation = 'CONTENT.CONFIGURATION.PAYMENT_SETTINGS.FORM.FIELDS';
	const errors: SiteConfigurationPaymentSettingsFormInterface = {
		accountId: '',
		defaultPreAuthorizedAmount: ''
	};

	// Title
	if (touched.accountId) {
		// required
		if (!values.accountId) {
			errors.accountId = `${translation}.ACCOUNT_ID.VALIDATIONS.REQUIRED`;
		}
	}

	// Pre-authorized Amount
	if (touched.defaultPreAuthorizedAmount) {
		// required
		if (!values.defaultPreAuthorizedAmount) {
			errors.defaultPreAuthorizedAmount = `${translation}.PRE_AUTHORIZED_AMOUNT.VALIDATIONS.REQUIRED`;
		} else if (values.defaultPreAuthorizedAmount < 5) {
			errors.defaultPreAuthorizedAmount = `${translation}.PRE_AUTHORIZED_AMOUNT.VALIDATIONS.LIMIT.MIN`;
		} else if (values.defaultPreAuthorizedAmount > 150) {
			errors.defaultPreAuthorizedAmount = `${translation}.PRE_AUTHORIZED_AMOUNT.VALIDATIONS.LIMIT.MAX`;
		}
	}

	return errors;
};
