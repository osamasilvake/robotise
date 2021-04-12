import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { ProductsContentInterface } from '../products/Products.slice.interface';

export interface InventoryInterface {
	loader: boolean;
	loading: boolean;
	content: InventoryContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface InventoryContentInterface {
	status: string;
	id: string;
	drawers: InventoryContentDrawerInterface[];
	robot: InventoryContentRobotInterface;
}

export interface InventoryContentDrawerInterface {
	index: number;
	type: string;
	lanes: InventoryContentDrawerLaneInterface[];
	title: string;
}

export interface InventoryContentRobotInterface {
	id: string;
}

export interface InventoryContentDrawerLaneInterface {
	index: number;
	capacity: number;
	product: ProductsContentInterface;
	productId: string;
	quantity: number;
	status: string;
}
