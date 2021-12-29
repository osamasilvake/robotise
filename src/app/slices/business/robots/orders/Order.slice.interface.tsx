import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SOCDataInterface } from './Orders.slice.interface';

export interface SliceOrderInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	content: SOCDataInterface | null;
	errors: TriggerMessageInterface | null;
}
