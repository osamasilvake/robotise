import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../utilities/serializers/json-api/JsonApi.interface';

export interface ProductsInterface {
	loader: boolean;
	loading: boolean;
	content: ProductsContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface ProductsContentInterface {
	data: ProductsDataInterface[];
	dataById: ProductsDataByIdInterface;
	site: ProductsSiteInterface;
	meta: JsonApiMeta;
}

export interface ProductsDataInterface {
	site: ProductsSiteInterface;
	id: string;
	image: string;
	name: string;
	length: number;
	volume: string;
	price: number;
	createdAt: string;
	updatedAt: string;
}

export interface ProductsDataByIdInterface {
	[id: string]: ProductsDataInterface;
}

export interface ProductsSiteInterface {
	id: string;
}
