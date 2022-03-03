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
		helpPage: ''
	};

	// Help Page
	if (touched.helpPage) {
		// required
		if (!values.helpPage) {
			errors.helpPage = `${translation}.HELP_PAGE.VALIDATIONS.REQUIRED`;
		}
	}

	return errors;
};
