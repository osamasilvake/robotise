import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../utilities/serializers/json-api/JsonApi.interface';

export interface SliceProductsInterface {
	loader: boolean;
	loading: boolean;
	content: SPContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SPContentInterface {
	data: SPCDataInterface[];
	dataById: SPCDataByIdInterface;
	site?: SPCSiteInterface;
	meta: JsonApiMeta;
}

export interface SPCDataInterface {
	site: SPCSiteInterface;
	id: string;
	image: string;
	name: string;
	length: number;
	volume: string;
	price: number;
	createdAt: string;
	updatedAt: string;
}

export interface SPCDataByIdInterface {
	[id: string]: SPCDataInterface;
}

export interface SPCSiteInterface {
	id: string;
}
