import { TriggerMessageInterface } from '../../frame/message/Message.interface';
import { ThemePaletteTypeEnum } from './General.enum';

export interface GeneralSliceInterface {
	openDrawer: boolean;
	themePalette: ThemePaletteTypeEnum;
	triggerMessage: TriggerMessageInterface;
}
