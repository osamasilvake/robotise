import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SAODataInterface } from './AllOrders.slice.interface';

export interface SliceAllOrderInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	content: SAODataInterface | null;
	errors: TriggerMessageInterface | null;
}
