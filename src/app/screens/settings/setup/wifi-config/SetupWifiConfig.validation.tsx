import { SetupWifiConfigFormInterface } from './SetupWifiConfig.interface';

/**
 * wifi config validation
 * @param values
 * @param touched
 */
export const WifiConfigValidation = (
	values: SetupWifiConfigFormInterface,
	touched: SetupWifiConfigFormInterface
): SetupWifiConfigFormInterface => {
	const translation = 'CONTENT.WIFI_CONFIG.FORM.FIELDS';
	const errors: SetupWifiConfigFormInterface = {
		site: '',
		ssid: '',
		country: '',
		authentication: ''
	};

	// Site
	if (touched.site) {
		// required
		if (!values.site) {
			errors.site = `${translation}.SITE.VALIDATIONS.REQUIRED`;
		}
	}

	// SSID
	if (touched.ssid) {
		// required
		if (!values.ssid) {
			errors.ssid = `${translation}.SSID.VALIDATIONS.REQUIRED`;
		}
	}

	return errors;
};
