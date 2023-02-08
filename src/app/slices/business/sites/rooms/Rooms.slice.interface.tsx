import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';
import { RoomsTypeEnum } from './Rooms.slice.enum';

export interface SliceRoomsInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SRContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SRContentInterface extends JsonAPIResponseInterface {
	data: SRContentDataInterface[];
	dataById: SRContentDataByIdInterface;
	groupByType: SRContentGroupByTypeInterface[];
	state?: SRCStateInterface;
}

export interface SRContentDataInterface {
	id: string;
	type: string;
	name: string;
	desc: string;
	metadata: {
		blocked: boolean;
		phone: { postfix: string };
		position: { x: number; y: number; theta: number };
		door: { handleSide: string };
	};
}

export interface SRContentDataByIdInterface {
	[key: string]: SRContentDataInterface;
}

export interface SRContentGroupByTypeInterface {
	key: RoomsTypeEnum;
	values: SRContentDataInterface[];
}

export interface SRCStateInterface {
	active?: boolean;
	inactive?: boolean;
	searchText?: string;
	pSiteId?: string;
}
