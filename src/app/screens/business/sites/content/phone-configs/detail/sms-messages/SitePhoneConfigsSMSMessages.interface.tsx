import { PCContentInterface } from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';

export interface SitePhoneConfigsSMSMessagesInterface {
	content: PCContentInterface | null;
}

export interface SitePhoneConfigsSMSMessagesFormInterface {
	[key: string]: string;
}
