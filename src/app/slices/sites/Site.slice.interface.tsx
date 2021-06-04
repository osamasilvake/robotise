import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { ISite } from './Sites.slice.interface';

export interface SliceSiteInterface {
	acceptOrders: {
		loading: boolean;
		content: ISite | null;
		errors: TriggerMessageInterface | null;
	};
}
