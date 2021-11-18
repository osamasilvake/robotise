import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SPCDataInterface } from './Purchases.slice.interface';

export interface SlicePurchaseInterface {
	loader: boolean;
	content: SPCDataInterface | null;
	errors: TriggerMessageInterface | null;
}
