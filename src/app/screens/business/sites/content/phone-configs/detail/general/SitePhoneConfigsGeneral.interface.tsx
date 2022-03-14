import { Dispatch, SetStateAction } from 'react';

import {
	PCCDataInterface,
	PCContentInterface
} from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';

export interface SitePhoneConfigsGeneralInterface {
	content: PCContentInterface | null;
}

export interface DialogEditPhoneConfigInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	phoneConfig: PCCDataInterface;
}

export interface DialogEditPhoneConfigFormInterface {
	prefixes: string;
	from: string;
	mode: string;
	outboundPattern: string;
	callbackRetries: string;
}
