import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { ConfigService, StorageService } from '../../services';
import { RootStateInterface } from '../Slices.interface';
import { PushMessageTypeEnum, ThemeColorsEnum } from './General.enum';
import { GeneralSliceInterface } from './General.interface';

// storage items
const themeColor = StorageService.get(ConfigService.AppLocalStorageItems.ThemeColor);
const drawerState = StorageService.get(ConfigService.AppLocalStorageItems.DrawerState);

// initial state
export const initialState: GeneralSliceInterface = {
	openDrawer: drawerState === '' ? true : drawerState,
	themeColor: themeColor || ThemeColorsEnum.DARK,
	pushMessage: {
		severity: PushMessageTypeEnum.INFO,
		text: ''
	}
};

// slice
const dataSlice = createSlice({
	name: 'General',
	initialState,
	reducers: {
		generalOpenDrawer: (state, action) => {
			state.openDrawer = action.payload;
		},
		generalThemeColor: (state, action) => {
			state.themeColor = action.payload;
		},
		generalPushMessage: (state, action) => {
			state.pushMessage = action.payload;
		},
		resetState: () => initialState
	}
});

// actions
export const {
	generalOpenDrawer,
	generalThemeColor,
	generalPushMessage,
	resetState
} = dataSlice.actions;

// selector
export const generalSelector = (state: RootStateInterface) => state['general'];

// reducer
export default dataSlice.reducer;

/**
 * set drawer state
 * @param drawerState
 */
export const GenernalSetDrawerState = (drawerState: boolean) => async (dispatch: Dispatch) => {
	// dispstch: set drawer state
	dispatch(generalOpenDrawer(drawerState));

	// store it in local_storage
	StorageService.put(ConfigService.AppLocalStorageItems.DrawerState, drawerState);
};

/**
 * apply theme color
 * @param themeColor
 */
export const GenernalApplyTheme = (themeColor: ThemeColorsEnum) => async (dispatch: Dispatch) => {
	// dispstch: apply theme color
	dispatch(generalThemeColor(themeColor));

	// store it in local_storage
	StorageService.put(ConfigService.AppLocalStorageItems.ThemeColor, themeColor);
};
