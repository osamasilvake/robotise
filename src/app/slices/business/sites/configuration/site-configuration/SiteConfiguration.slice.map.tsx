import { TriggerMessageTypeEnum } from '../../../../../components/frame/message/Message.enum';
import { SiteConfigurationTriggerMessageTypeEnum } from './SiteConfiguration.slice.enum';

/**
 * handle trigger message
 * @param status
 * @returns
 */
export const handleTriggerMessage = (status: string) => {
	switch (status) {
		case SiteConfigurationTriggerMessageTypeEnum.CREATED:
		case SiteConfigurationTriggerMessageTypeEnum.PROGRESS:
			return {
				severity: TriggerMessageTypeEnum.WARNING,
				text: 'SITES.CONFIGURATION.SITE_CONFIGURATION.CREATED'
			};
		case SiteConfigurationTriggerMessageTypeEnum.SUCCEED:
			return {
				severity: TriggerMessageTypeEnum.SUCCESS,
				text: 'SITES.CONFIGURATION.SITE_CONFIGURATION.SUCCESS'
			};
		case SiteConfigurationTriggerMessageTypeEnum.REJECTED:
		case SiteConfigurationTriggerMessageTypeEnum.FAILED:
			return {
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'SITES.CONFIGURATION.SITE_CONFIGURATION.FAILED'
			};
		default:
			return {
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'SITES.CONFIGURATION.SITE_CONFIGURATION.UNKNOWN'
			};
	}
};
