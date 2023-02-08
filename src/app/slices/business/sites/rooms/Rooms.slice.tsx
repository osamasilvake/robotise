import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { timeout } from '../../../../utilities/methods/Timeout';
import { RootState } from '../../..';
import { triggerMessage } from '../../../app/App.slice';
import { deserializeRooms } from './Rooms.slice.deserialize';
import {
	SliceRoomsInterface,
	SRContentDataInterface,
	SRContentInterface,
	SRCStateInterface
} from './Rooms.slice.interface';

// initial state
export const initialState: SliceRoomsInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Rooms',
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
		updating: (state) => {
			state.updating = true;
		},
		updated: (state, action) => {
			state.updating = false;
			if (action.payload) {
				state.content = action.payload;
			}
		},
		updateFailed: (state) => {
			state.updating = false;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, updating, updated, updateFailed, reset } =
	dataSlice.actions;

// selector
export const roomsSelector = (state: RootState) => state['rooms'];

// reducer
export default dataSlice.reducer;

/**
 * fetch room locations
 * @param siteId
 * @param refresh
 * @returns
 */
export const RoomsLocationsFetch =
	(siteId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const rooms = states.rooms;
		const state = rooms.content?.state;

		// return on busy
		if (rooms && (rooms.loader || rooms.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch locations
		return SitesService.sitesRoomsLocations(siteId)
			.then(async (res) => {
				// deserialize response
				let result: SRContentInterface = await deserializeRooms(res);

				// set state
				result = {
					...result,
					state: {
						...state,
						pSiteId: siteId
					}
				};

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'rooms-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * update location
 * @param location
 * @param callback
 * @returns
 */
export const RoomLocationUpdate =
	(location: SRContentDataInterface, callback: () => void) => async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return SitesService.siteRoomLocationUpdate(location)
			.then(async () => {
				// wait
				await timeout(1000);

				// dispatch: updated
				dispatch(updated(null));

				// callback
				callback();

				// wait
				await timeout(1000);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'rooms-update-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.ROOMS.UPDATE.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'rooms-update-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.ROOMS.UPDATE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * update state
 * @param siteId
 * @param state
 * @returns
 */
export const RoomsUpdateState =
	(siteId: string, state: SRCStateInterface) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const rooms = states.rooms;

		// dispatch: updating
		dispatch(updating());

		const result = {
			...rooms.content,
			state: {
				...state,
				pSiteId: siteId
			}
		};

		// dispatch: updated
		dispatch(updated(result));
	};
