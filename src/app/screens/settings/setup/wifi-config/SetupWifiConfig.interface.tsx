export interface SetupWifiConfigFormInterface {
	site: string;
	ssid: string;
	country: string;
	authentication: string;
	pskPassword?: string;
	regMacAddress?: string;
	macAddress?: string;
}
