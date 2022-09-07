import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SOCDataInterface } from './AllOrders.slice.interface';

export interface SliceAllOrderInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	content: SOCDataInterface | null;
	errors: TriggerMessageInterface | null;
}
