import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SPCDataInterface } from './Purchases.slice.interface';

export interface SlicePurchaseInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	content: SPCDataInterface | null;
	errors: TriggerMessageInterface | null;
}
