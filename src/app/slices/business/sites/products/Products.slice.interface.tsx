import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../../JsonApi.interface';

export interface SliceProductsInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SPContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SPContentInterface {
	data: SPCDataInterface[];
	meta: JsonApiMeta;
	state?: SPCStateInterface;
}

export interface SPCDataInterface {
	site: SPCSiteInterface;
	id: string;
	image: string;
	name: string;
	length: number;
	weight: number;
	volume: string;
	price: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface SPCSiteInterface {
	id: string;
}

export interface SPCStateInterface {
	pSiteId?: string;
}
