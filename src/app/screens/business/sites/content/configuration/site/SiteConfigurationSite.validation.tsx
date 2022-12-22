import { SCCDataElementInterface } from '../../../../../../slices/business/sites/configuration/site/SiteConfiguration.slice.interface';

/**
 * validation
 * @param values
 */
export const SiteConfigurationSiteValidation = (
	values: SCCDataElementInterface
): SCCDataElementInterface => {
	const translation = 'CONTENT.CONFIGURATION.SITE.FORM.FIELDS.VALIDATIONS';

	const errors: SCCDataElementInterface = Object.entries(values)?.reduce(
		(acc, [k, v]) => (v ? acc : { ...acc, [k]: `${translation}.REQUIRED` }),
		{}
	);
	return errors;
};
