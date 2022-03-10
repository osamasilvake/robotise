import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { AppConfigService, StorageService } from '../../services';
import { AppReducerType } from '..';
import { AppLanguageTypeEnum, AppThemePaletteTypeEnum } from './App.slice.enum';
import { SliceAppInterface } from './App.slice.interface';

// storage items
const theme = StorageService.get(AppConfigService.StorageItems.ThemePalette);
const language = StorageService.get(AppConfigService.StorageItems.ChangeLanguage);
const drawerState = StorageService.get(AppConfigService.StorageItems.DrawerState);

// initial state
export const initialState: SliceAppInterface = {
	openDrawer: drawerState,
	themePalette: theme || AppThemePaletteTypeEnum.DARK,
	currentLanguage: language || AppLanguageTypeEnum.EN,
	triggerMessage: {
		id: 'init',
		show: false,
		severity: TriggerMessageTypeEnum.INFO,
		text: 'INIT'
	}
};

// slice
const dataSlice = createSlice({
	name: 'App',
	initialState,
	reducers: {
		setDrawerState: (state, action) => {
			state.openDrawer = action.payload;
		},
		applyThemePalette: (state, action) => {
			state.themePalette = action.payload;
		},
		changeLanguage: (state, action) => {
			state.currentLanguage = action.payload;
		},
		triggerMessage: (state, action) => {
			state.triggerMessage = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const { setDrawerState, applyThemePalette, changeLanguage, triggerMessage, reset } =
	dataSlice.actions;

// selector
export const appSelector = (state: AppReducerType) => state['app'];

// reducer
export default dataSlice.reducer;

/**
 * set drawer state
 * @param drawerState
 */
export const AppSetDrawerState = (drawerState: boolean) => async (dispatch: Dispatch) => {
	// dispatch: set drawer state
	dispatch(setDrawerState(drawerState));

	// storage: drawer state
	StorageService.put(AppConfigService.StorageItems.DrawerState, drawerState);
};

/**
 * apply theme palette
 * @param theme
 */
export const AppApplyThemePalette =
	(theme: AppThemePaletteTypeEnum) => async (dispatch: Dispatch) => {
		// dispatch: apply theme palette
		dispatch(applyThemePalette(theme));

		// storage: theme palette
		StorageService.put(AppConfigService.StorageItems.ThemePalette, theme);
	};

/**
 * change language
 * @param language
 */
export const AppChangeLanguage = (language: AppLanguageTypeEnum) => async (dispatch: Dispatch) => {
	// dispatch: change language
	dispatch(changeLanguage(language));

	// storage: change language
	StorageService.put(AppConfigService.StorageItems.ChangeLanguage, language);
};

/**
 * trigger message
 * @param message
 */
export const AppTriggerMessage =
	(message: TriggerMessageInterface) => async (dispatch: Dispatch) => {
		// dispatch: trigger message
		dispatch(triggerMessage(message));
	};
