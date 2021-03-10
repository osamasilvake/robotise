import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { ThemePaletteTypeEnum } from './General.enum';

export interface GeneralSliceInterface {
	openDrawer: boolean;
	themePalette: ThemePaletteTypeEnum;
	triggerMessage: TriggerMessageInterface;
	changelog: string;
}
