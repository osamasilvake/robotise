import { AppConfigService } from '../../../../services';
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
	const regexMacAddress = AppConfigService.AppOptions.regex.macAddress;
	const regexIpAddress = AppConfigService.AppOptions.regex.ipAddress;
	const regexIpNetmask = AppConfigService.AppOptions.regex.ipNetmask;
	const errors: SetupWifiConfigFormInterface = {
		site: '',
		ssid: '',
		authentication: '',
		macAddress: '',
		ipConfig: '',
		address: '',
		netmask: ''
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

	// PSK Password
	if (touched.pskPassword) {
		// required
		if (!values.pskPassword) {
			errors.pskPassword = `${translation}.PSK_PASSWORD.VALIDATIONS.REQUIRED`;
		}
	}

	// MAC Address
	if (touched.macAddress) {
		// invalid
		if (values.macAddress && !regexMacAddress.test(values.macAddress)) {
			errors.macAddress = `${translation}.MAC_ADDRESS.VALIDATIONS.INVALID`;
		}
	}

	// IP Address
	if (touched.address) {
		// required
		if (!values.address) {
			errors.address = `${translation}.ADDRESS.VALIDATIONS.REQUIRED`;
		}

		// invalid
		if (values.address && !regexIpAddress.test(values.address)) {
			errors.address = `${translation}.ADDRESS.VALIDATIONS.INVALID`;
		}
	}

	// IP Netmask
	if (touched.netmask) {
		// required
		if (!values.netmask) {
			errors.netmask = `${translation}.NETMASK.VALIDATIONS.REQUIRED`;
		}

		// invalid
		if (values.netmask && !regexIpNetmask.test(values.netmask)) {
			errors.netmask = `${translation}.NETMASK.VALIDATIONS.INVALID`;
		}
	}

	// IP Gateway
	if (touched.gateway) {
		// required
		if (!values.gateway) {
			errors.gateway = `${translation}.GATEWAY.VALIDATIONS.REQUIRED`;
		}

		// invalid
		if (values.gateway && !regexIpAddress.test(values.gateway)) {
			errors.gateway = `${translation}.GATEWAY.VALIDATIONS.INVALID`;
		}
	}

	// IP DNS Server
	if (touched.dnsServer) {
		// required
		if (!values.dnsServer) {
			errors.dnsServer = `${translation}.DNS_SERVER.VALIDATIONS.REQUIRED`;
		}

		// invalid
		if (values.dnsServer && !regexIpAddress.test(values.dnsServer)) {
			errors.dnsServer = `${translation}.DNS_SERVER.VALIDATIONS.INVALID`;
		}
	}

	return errors;
};
