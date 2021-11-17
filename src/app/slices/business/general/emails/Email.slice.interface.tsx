import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SECDataInterface } from './Emails.slice.interface';

export interface SliceEmailInterface {
	loader: boolean;
	content: SECDataInterface | null;
	errors: TriggerMessageInterface | null;
}
