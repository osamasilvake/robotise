import { PCCDataInterface } from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';

/**
 * map phone configs
 * @param phoneConfig
 * @returns
 */
export const mapPhoneConfig = (phoneConfig: PCCDataInterface) => {
	const translation = 'CONTENT.PHONE_CONFIGS.LIST.TABLE.VALUES';
	return {
		...phoneConfig,
		mode: `${translation}.MODE.${phoneConfig.mode}`,
		prefixes: phoneConfig.prefixes.join(', '),
		workflow: `${translation}.WORKFLOW.${phoneConfig.workflow}`,
		messages: Object.entries(phoneConfig.messages).map(([key, value]) => ({
			key: `${translation}.MESSAGES.${key}`,
			value
		}))
	};
};
