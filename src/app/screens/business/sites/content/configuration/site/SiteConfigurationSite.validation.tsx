import { SCCDataElementInterface } from '../../../../../../slices/business/sites/configuration/site-configuration/SiteConfiguration.slice.interface';

/**
 * validation
 * @param values
 */
export const SiteConfigurationSiteValidation = (
	values: SCCDataElementInterface
): SCCDataElementInterface => {
	const translation = 'CONTENT.CONFIGURATION.SITE_CONFIGURATION.FORM.FIELD.VALIDATIONS';

	const errors: SCCDataElementInterface = Object.entries(values)?.reduce(
		(acc, [k, v]) => (v ? acc : { ...acc, [k]: `${translation}.REQUIRED` }),
		{}
	);
	return errors;
};
