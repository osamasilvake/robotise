import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../../JsonAPI.interface';

export interface SliceMarketingRidesInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: MRContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface MRContentInterface extends JsonAPIResponseInterface {
	data: MRContentDataInterface[];
	state?: MRContentStateInterface;
}

export interface MRContentDataInterface {
	id: string;
	active: boolean;
	createdAt: Date;
	locations: string[];
	times: {
		hour: number;
		minutes: number[];
	}[];
}

export interface MRContentStateInterface {
	pSiteId?: string;
}
