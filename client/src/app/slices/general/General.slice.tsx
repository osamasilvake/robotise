import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageInterface } from '../../frame/message/Message.interface';
import { ConfigService, StorageService } from '../../services';
import { RootStateInterface } from '../Slices.interface';
import { ThemePaletteEnum } from './General.enum';
import { GeneralSliceInterface } from './General.interface';

// storage items
const themePalette = StorageService.get(ConfigService.AppLocalStorageItems.ThemePalette);
const drawerState = StorageService.get(ConfigService.AppLocalStorageItems.DrawerState);

// initial state
export const initialState: GeneralSliceInterface = {
	openDrawer: drawerState === '' ? true : drawerState,
	themePalette: themePalette || ThemePaletteEnum.DARK,
	triggerMessage: { show: false }
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
		triggerMessage: (state, action) => {
			state.triggerMessage = action.payload;
		},
		resetState: () => initialState
	}
});

// actions
export const { setDrawerState, applyThemePalette, triggerMessage, resetState } = dataSlice.actions;

// selector
export const generalSelector = (state: RootStateInterface) => state['general'];

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
	StorageService.put(ConfigService.AppLocalStorageItems.DrawerState, drawerState);
};

/**
 * apply theme palette
 * @param themePalette
 */
export const GeneralApplyThemePalette = (themePalette: ThemePaletteEnum) => async (
	dispatch: Dispatch
) => {
	// dispatch: apply theme palette
	dispatch(applyThemePalette(themePalette));

	// store it in local_storage
	StorageService.put(ConfigService.AppLocalStorageItems.ThemePalette, themePalette);
};

/**
 * trigger message
 * @param messagePayload
 */
export const GeneralTriggerMessage = (messagePayload: TriggerMessageInterface) => async (
	dispatch: Dispatch
) => {
	// dispatch: trigger message
	dispatch(triggerMessage(messagePayload));
};
