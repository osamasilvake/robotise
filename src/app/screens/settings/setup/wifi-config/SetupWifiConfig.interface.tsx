export interface SetupWifiConfigFormInterface {
	site: string;
	ssid: string;
	country?: { id: string; title: string };
	authentication: string;
	pskPassword?: string;
	regMacAddress?: string;
	macAddress?: string;
	hiddenNetwork?: boolean;
	ipConfig: string;
	address?: string;
	netmask?: string;
	gateway?: string;
	dnsServer?: string;
}
