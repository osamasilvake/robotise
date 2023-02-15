import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { RootState } from '../../..';
import { deserializeFloors } from './Floors.slice.deserialize';
import { SFContentInterface, SliceFloorsInterface } from './Floors.slice.interface';

// initial state
export const initialState: SliceFloorsInterface = {
	init: false,
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Floors',
	initialState,
	reducers: {
		loader: (state) => {
			state.loader = true;
		},
		loading: (state) => {
			state.loading = true;
		},
		success: (state, action) => {
			state.init = true;
			state.loader = false;
			state.loading = false;
			state.content = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.init = true;
			state.loader = false;
			state.loading = false;
			state.content = null;
			state.errors = action.payload;
		},
		loaded: (state) => {
			state.loading = false;
			state.loader = false;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, loaded, failure, reset } = dataSlice.actions;

// selector
export const floorsSelector = (state: RootState) => state['floors'];

// reducer
export default dataSlice.reducer;

/**
 * fetch floors
 * @param siteId
 * @returns
 */
export const FloorsFetch =
	(siteId: string) => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const floors = states.floors;

		// return on busy
		if (floors && floors.loader) {
			return;
		}

		// dispatch: loader
		dispatch(loader());

		return SitesService.sitesFloorsFetch(siteId)
			.then(async (res) => {
				// results
				let result: SFContentInterface = await deserializeFloors(res);

				// sort
				result = {
					...result,
					state: {
						pSiteId: siteId
					}
				};

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'floors-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
