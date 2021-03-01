import { PushMessageTypeEnum } from './General.enum';

export interface GeneralSliceInterface {
	openDrawer: boolean;
	pushMessage: PushMessageInterface;
}

export interface PushMessageInterface {
	severity: PushMessageTypeEnum;
	text: string;
}
