import { TriggerMessageEnum } from '../../frame/message/Message.interface';
import { ThemePaletteEnum } from './General.enum';

export interface GeneralSliceInterface {
	openDrawer: boolean;
	themePalette: ThemePaletteEnum;
	triggerMessage: TriggerMessageInterface;
}

export interface TriggerMessageInterface {
	severity: TriggerMessageEnum;
	text: string;
}
