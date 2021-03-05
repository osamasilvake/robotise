import { TriggerMessageEnum } from './Message.enum';

export interface TriggerMessageInterface {
	show: boolean;
	severity?: TriggerMessageEnum;
	text?: string;
}
