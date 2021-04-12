import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';

export interface ProductsInterface {
	loader: boolean;
	loading: boolean;
	content: ProductsContentInterface[] | null;
	errors: TriggerMessageInterface | null;
}

export interface ProductsContentInterface {
	id: string;
	image: string;
	name: string;
	length: number;
	volume: string;
	price: number;
	createdAt: string;
	updatedAt: string;
}
