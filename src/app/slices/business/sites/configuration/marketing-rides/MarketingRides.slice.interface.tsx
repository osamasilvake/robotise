import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';

export interface SliceMarketingRidesInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SMRContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SMRContentInterface {
	data: SMRContentDataInterface[];
	pSiteId?: string;
}

export interface SMRContentDataInterface {
	id: string;
	name: string;
}
