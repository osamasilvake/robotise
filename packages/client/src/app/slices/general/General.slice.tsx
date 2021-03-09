import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageInterface } from '../../frame/message/Message.interface';
import ChangelogService from '../../screens/information/changelogs/Changelog.service';
import { AppConfigService, StorageService } from '../../services';
import { RootStateInterface } from '../Slices.interface';
import { ThemePaletteTypeEnum } from './General.enum';
import { GeneralSliceInterface } from './General.interface';

// storage items
const themePalette = StorageService.get(AppConfigService.AppLocalStorageItems.ThemePalette);
const drawerState = StorageService.get(AppConfigService.AppLocalStorageItems.DrawerState);

// initial state
export const initialState: GeneralSliceInterface = {
	openDrawer: drawerState === '' ? true : drawerState,
	themePalette: themePalette || ThemePaletteTypeEnum.DARK,
	triggerMessage: { show: false },
	changelog: ''
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
		fetchChangelog: (state, action) => {
			state.changelog = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const {
	setDrawerState,
	applyThemePalette,
	triggerMessage,
	fetchChangelog,
	reset
} = dataSlice.actions;

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
	StorageService.put(AppConfigService.AppLocalStorageItems.DrawerState, drawerState);
};

/**
 * apply theme palette
 * @param themePalette
 */
export const GeneralApplyThemePalette = (themePalette: ThemePaletteTypeEnum) => async (
	dispatch: Dispatch
) => {
	// dispatch: apply theme palette
	dispatch(applyThemePalette(themePalette));

	// store it in local_storage
	StorageService.put(AppConfigService.AppLocalStorageItems.ThemePalette, themePalette);
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

/**
 * fetch changelog
 */
export const GeneralFetchChangelog = () => async (dispatch: Dispatch) => {
	ChangelogService.changlogFetch().then((res) => {
		// dispatch: update changelog
		dispatch(fetchChangelog(JSON.stringify(res)));
	});
};
