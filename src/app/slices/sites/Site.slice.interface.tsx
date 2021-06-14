import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { ISite } from './Sites.slice.interface';

export interface SliceSiteInterface {
	servicePositions: {
		loading: boolean;
		content: SRContentServicePositionsInterface | null;
		errors: TriggerMessageInterface | null;
	};
	acceptOrders: {
		loading: boolean;
		content: ISite | null;
		errors: TriggerMessageInterface | null;
	};
}

export interface SRContentServicePositionsInterface {
	data: {
		id: string;
		name: string;
		location: string;
	}[];
	site: {
		id: string;
	};
}
