import { Dispatch, SetStateAction } from 'react';

import { PCCDataMessagesInterface } from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';

export interface DialogEditPhoneConfigInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogEditPhoneConfigFormInterface {
	mode: string;
	prefixes: string;
	from: string;
	outboundPattern: string;
	callbackRetries: string;
	smsGateway: string;
	smsMessages?: PCCDataMessagesInterface;
}

export interface DialogTestOutboundCallPhoneConfigInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogTestOutboundCallPhoneConfigFormInterface {
	prefix: string;
	location: string;
}
