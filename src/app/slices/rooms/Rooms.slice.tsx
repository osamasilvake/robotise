import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { SiteRoomsActionsFiltersPayloadInterface } from '../../screens/business/sites/content/rooms/list/actions/SiteRoomsActions.interface';
import SitesService from '../../screens/business/sites/Sites.service';
import { deserializeSite } from '../../utilities/serializers/json-api/Site.deserialize';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
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
				siteId
			})
		);
	};

/**
 * update room state
 * @param siteId
 * @param whitelist
 * @returns
 */
export const RoomUpdateState =
	(siteId: string, whitelist: string[]) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const rooms = states.rooms;

		// dispatch: loading
		dispatch(updating());

		return SitesService.siteUpdateRoomState(siteId, whitelist)
			.then(async (res) => {
				// deserialize response
				const result = await deserializeSite(res);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `site-update-rooms-success`,
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `SITES.ROOMS.UPDATE.SUCCESS`
				};
				dispatch(triggerMessage(message));

				// dispatch: updated
				dispatch(updated({ ...rooms.content, site: result }));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `site-update-rooms-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `SITES.ROOMS.UPDATE.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: updateFailed
				dispatch(updateFailed());
			});
	};
