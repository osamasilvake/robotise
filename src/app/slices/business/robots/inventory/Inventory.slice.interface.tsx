import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';

export interface SliceInventoryInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	content: SIContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SIContentInterface {
	id: string;
	status: string;
	drawers: SICDrawerInterface[];
	robot: SICRobotInterface;
}

export interface SICDrawerInterface {
	index: number;
	type: string;
	lanes: SICDrawerLaneInterface[];
	is_empty: boolean;
	lane_count: number;
}

export interface SICRobotInterface {
	id: string;
}

export interface SICDrawerLaneInterface {
	index: number;
	status: string;
	capacity: number;
	quantity: number;
	inCartQuantity: number;
	productId: string;
}
