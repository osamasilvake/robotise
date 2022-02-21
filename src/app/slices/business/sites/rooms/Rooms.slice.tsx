import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { DialogModifyRoomsFormInterface } from '../../../../screens/business/sites/content/rooms/list/actions/SiteRoomsActions.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { timeout } from '../../../../utilities/methods/Timeout';
import { AppReducerType } from '../../..';
import { triggerMessage } from '../../../general/General.slice';
import { SliceRoomsInterface, SRCStateInterface } from './Rooms.slice.interface';

// initial state
export const initialState: SliceRoomsInterface = {
	updating: false,
	content: null
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
export const { updating, updated, updateFailed, reset } = dataSlice.actions;

// selector
export const roomsSelector = (state: AppReducerType) => state['rooms'];

// reducer
export default dataSlice.reducer;

/**
 * update room
 * @param siteId
 * @param payload
 * @param callback
 * @returns
 */
export const RoomsUpdate =
	(siteId: string, payload: DialogModifyRoomsFormInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return SitesService.siteRoomStateUpdate(siteId, payload)
			.then(async () => {
				// wait
				await timeout(1000);

				// callback
				callback();

				// wait
				await timeout(1000);

				// dispatch: updated
				dispatch(updated(null));

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
	(siteId: string | undefined, state: SRCStateInterface) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
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
