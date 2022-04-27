import { Dispatch, SetStateAction } from 'react';

import {
	PCCDataMessagesInterface,
	PCContentInterface
} from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';

export interface SitePhoneConfigsGeneralInterface {
	content: PCContentInterface | null;
}

export interface DialogEditPhoneConfigInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogEditPhoneConfigFormInterface {
	prefixes: string;
	from: string;
	mode: string;
	outboundPattern: string;
	callbackRetries: string;
	smsGateway: string;
	smsMessages?: PCCDataMessagesInterface;
}

export interface SitePhoneConfigUploadAudioInterface {
	code: string;
	audioFileBase64: string;
}
