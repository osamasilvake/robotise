import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SiteRoomsActionsFiltersPayloadInterface } from '../../../../screens/business/sites/content/rooms/list/actions/SiteRoomsActions.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { timeout } from '../../../../utilities/methods/Timeout';
import { AppReducerType } from '../../..';
import { triggerMessage } from '../../../general/General.slice';
import { deserializeSite } from './Rooms.slice.deserialize';
import { SliceRoomsInterface } from './Rooms.slice.interface';

// initial state
export const initialState: SliceRoomsInterface = {
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Rooms',
	initialState,
	reducers: {
		updating: (state) => {
			state.updating = true;
		},
		updated: (state, action) => {
			state.updating = false;
			state.content = action.payload;
			state.errors = null;
		},
		updateFailed: (state) => {
			state.updating = false;
			state.content = null;
			state.errors = null;
		},
		reset: () => initialState
	}
});

// actions
export const { updating, updated, updateFailed, reset } = dataSlice.actions;

// selector
export const roomsSelector = (state: AppReducerType) => state['rooms'];

// reducer
export default dataSlice.reducer;

/**
 * update rooms filters
 * @param siteId
 * @param filters
 * @returns
 */
export const RoomUpdateFilters =
	(siteId: string | undefined, filters: SiteRoomsActionsFiltersPayloadInterface) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const rooms = states.rooms;

		// dispatch: updated
		dispatch(
			updated({
				...rooms.content,
				filters,
				state: {
					pSiteId: siteId
				}
			})
		);
	};

/**
 * update room state
 * @param siteId
 * @param whitelist
 * @param callback
 * @returns
 */
export const RoomStateUpdate =
	(siteId: string, whitelist: string[], callback: () => void) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const rooms = states.rooms;

		// dispatch: updating
		dispatch(updating());

		return SitesService.siteRoomStateUpdate(siteId, whitelist)
			.then(async (res) => {
				// callback
				callback();

				// wait
				await timeout(1000);

				// deserialize response
				const result = await deserializeSite(res);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'rooms-update-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.ROOMS.UPDATE.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: updated
				dispatch(updated({ ...rooms.content, site: result }));
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
