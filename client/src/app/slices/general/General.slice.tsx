import { createSlice } from '@reduxjs/toolkit';

import { RootStateInterface } from '../Slices.interface';
import { PushMessageTypeEnum } from './General.enum';
import { GeneralSliceInterface } from './General.interface';

// initial state
export const initialState: GeneralSliceInterface = {
	openDrawer: true,
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
		generalPushMessage: (state, action) => {
			state.pushMessage = action.payload;
		},
		resetState: () => initialState
	}
});

// actions
export const { generalOpenDrawer, generalPushMessage, resetState } = dataSlice.actions;

// selector
export const generalSelector = (state: RootStateInterface) => state['general'];

// reducer
export default dataSlice.reducer;
