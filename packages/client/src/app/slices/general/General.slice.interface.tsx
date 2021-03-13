import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { ThemePaletteTypeEnum } from './General.slice.enum';

export interface GeneralSliceInterface {
	openDrawer: boolean;
	themePalette: ThemePaletteTypeEnum;
	triggerMessage: TriggerMessageInterface;
	changeLog: string;
}
