import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SECDataInterface } from './Emails.slice.interface';

export interface SliceEmailInterface {
	init: boolean;
	loader: boolean;
	content: SECDataInterface | null;
	errors: TriggerMessageInterface | null;
}
