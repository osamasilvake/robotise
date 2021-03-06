import { TriggerMessageTypeEnum } from './Message.enum';

export interface TriggerMessageInterface {
	show: boolean;
	severity?: TriggerMessageTypeEnum;
	text?: string;
}
