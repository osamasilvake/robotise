import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { SPCDataInterface } from '../products/Products.slice.interface';

export interface SliceInventoryInterface {
	loader: boolean;
	loading: boolean;
	content: SIContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SIContentInterface {
	status: string;
	id: string;
	drawers: SICDrawerInterface[];
	robot: SICRobotInterface;
}

export interface SICDrawerInterface {
	index: number;
	type: string;
	lanes: SICDrawerLaneInterface[];
	title: string;
}

export interface SICRobotInterface {
	id: string;
}

export interface SICDrawerLaneInterface {
	index: number;
	capacity: number;
	product: SPCDataInterface | null;
	productId: string;
	quantity: number;
	status: string;
}
