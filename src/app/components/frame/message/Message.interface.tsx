import { TriggerMessageTypeEnum } from './Message.enum';

export interface TriggerMessageInterface {
	id: string;
	show: boolean;
	severity: TriggerMessageTypeEnum;
	text: string;
	dynamicText?: boolean;
}
