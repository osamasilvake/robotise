import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { AppLanguageTypeEnum, AppThemePaletteTypeEnum } from './App.slice.enum';

export interface SliceAppInterface {
	openDrawer: boolean;
	themePalette: AppThemePaletteTypeEnum;
	currentLanguage: AppLanguageTypeEnum;
	triggerMessage: TriggerMessageInterface;
}
