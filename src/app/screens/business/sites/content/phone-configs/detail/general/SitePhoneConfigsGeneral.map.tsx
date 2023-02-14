import { PCCDataInterface } from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';

/**
 * map phone config
 * @param phoneConfig
 * @returns
 */
export const mapPhoneConfig = (phoneConfig: PCCDataInterface) => ({
	...phoneConfig,
	prefixes: phoneConfig.prefixes.join(', '),
	messages:
		phoneConfig.messages &&
		Object.entries(phoneConfig.messages).map(([key, value]) => ({
			key,
			value
		}))
});
