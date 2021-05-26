import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../utilities/serializers/json-api/JsonApi.interface';

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
	site?: SPCSiteInterface;
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
	createdAt: string;
	updatedAt: string;
}

export interface SPCSiteInterface {
	id: string;
}
