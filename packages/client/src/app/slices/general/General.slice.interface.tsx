import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { GeneralLanguageTypeEnum, GeneralThemePaletteTypeEnum } from './General.slice.enum';

export interface GeneralSliceInterface {
	openDrawer: boolean;
	themePalette: GeneralThemePaletteTypeEnum;
	currentLanguage: GeneralLanguageTypeEnum;
	triggerMessage: TriggerMessageInterface;
	changeLog: string;
}
