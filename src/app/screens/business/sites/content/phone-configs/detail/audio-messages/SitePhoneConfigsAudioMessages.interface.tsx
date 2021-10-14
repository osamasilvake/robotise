import { PCContentInterface } from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';

export interface SitePhoneConfigsAudioMessagesInterface {
	content: PCContentInterface | null;
}

export interface SitePhoneConfigsAudioMessagesDataInterface {
	key: string;
	value: string;
}
