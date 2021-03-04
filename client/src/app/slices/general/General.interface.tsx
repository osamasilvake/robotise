import { PushMessageTypeEnum, ThemeColorsEnum } from './General.enum';

export interface GeneralSliceInterface {
	openDrawer: boolean;
	themeColor: ThemeColorsEnum;
	pushMessage: PushMessageInterface;
}

export interface PushMessageInterface {
	severity: PushMessageTypeEnum;
	text: string;
}
