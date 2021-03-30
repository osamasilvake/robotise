import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import ChangeLogService from '../../screens/information/change-log/ChangeLog.service';
import { AppConfigService, StorageService } from '../../services';
import { AppReducerType } from '..';
import { GeneralLanguageTypeEnum, GeneralThemePaletteTypeEnum } from './General.slice.enum';
import { GeneralSliceInterface } from './General.slice.interface';

// storage items
const theme = StorageService.get(AppConfigService.StorageItems.ThemePalette);
const language = StorageService.get(AppConfigService.StorageItems.ChangeLanguage);
const drawerState = StorageService.get(AppConfigService.StorageItems.DrawerState);

// initial state
export const initialState: GeneralSliceInterface = {
	openDrawer: drawerState,
	themePalette: theme || GeneralThemePaletteTypeEnum.DARK,
	currentLanguage: language || GeneralLanguageTypeEnum.EN,
	triggerMessage: {
		id: 'init',
		show: false
	},
	changeLog: ''
};

// slice
const dataSlice = createSlice({
	name: 'General',
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
		fetchChangeLog: (state, action) => {
			state.changeLog = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const {
	setDrawerState,
	applyThemePalette,
	changeLanguage,
	triggerMessage,
	fetchChangeLog,
	reset
} = dataSlice.actions;

// selector
export const generalSelector = (state: AppReducerType) => state['general'];

// reducer
export default dataSlice.reducer;

/**
 * set drawer state
 * @param drawerState
 */
export const GeneralSetDrawerState = (drawerState: boolean) => async (dispatch: Dispatch) => {
	// dispatch: set drawer state
	dispatch(setDrawerState(drawerState));

	// store it in local_storage
	StorageService.put(AppConfigService.StorageItems.DrawerState, drawerState);
};

/**
 * apply theme palette
 * @param theme
 */
export const GeneralApplyThemePalette = (theme: GeneralThemePaletteTypeEnum) => async (
	dispatch: Dispatch
) => {
	// dispatch: apply theme palette
	dispatch(applyThemePalette(theme));

	// store it in local_storage
	StorageService.put(AppConfigService.StorageItems.ThemePalette, theme);
};

/**
 * change language
 * @param language
 */
export const GeneralChangeLanguage = (language: GeneralLanguageTypeEnum) => async (
	dispatch: Dispatch
) => {
	// dispatch: change language
	dispatch(changeLanguage(language));

	// store it in local_storage
	StorageService.put(AppConfigService.StorageItems.ChangeLanguage, language);
};

/**
 * trigger message
 * @param message
 */
export const GeneralTriggerMessage = (message: TriggerMessageInterface) => async (
	dispatch: Dispatch
) => {
	// dispatch: trigger message
	dispatch(triggerMessage(message));
};

/**
 * fetch changelog
 */
export const GeneralFetchChangelog = () => async (dispatch: Dispatch) => {
	ChangeLogService.changelogFetch().then((res) => {
		// dispatch: update changelog
		dispatch(fetchChangeLog(JSON.stringify(res)));
	});
};
