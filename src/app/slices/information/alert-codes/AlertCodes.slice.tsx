import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import AlertCodesService from '../../../screens/information/alert-codes/AlertCodes.service';
import { AlertCodesListPayloadInterface } from '../../../screens/information/alert-codes/list/AlertCodesList.interface';
import { RootState } from '../..';
import { handleRefreshAndPagination } from '../../Slices.map';
import {
	SACContentInterface,
	SACStateInterface,
	SliceAlertCodesInterface
} from './AlertCodes.interface';
import { deserializeAlertCodes } from './AlertCodes.slice.deserialize';

// initial state
export const initialState: SliceAlertCodesInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Alert Codes',
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
			state.content = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, updating, updated, reset } = dataSlice.actions;

// selector
export const alertCodesSelector = (state: RootState) => state['alertCodes'];

// reducer
export default dataSlice.reducer;

/**
 * fetch alert codes
 * @param payload
 * @param refresh
 * @returns
 */
export const AlertCodesFetchList =
	(payload: AlertCodesListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const alertCodes = states.alertCodes;

		// return on busy
		if (alertCodes && (alertCodes.loader || alertCodes.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch alert codes
		return AlertCodesService.alertCodesFetch(payload)
			.then(async (res) => {
				// deserialize response
				let result: SACContentInterface = await deserializeAlertCodes(res);

				// set state
				result = {
					...result,
					state: payload
				};

				// handle refresh and pagination
				if (alertCodes && alertCodes.content) {
					result = handleRefreshAndPagination(
						alertCodes.content,
						result,
						refresh,
						payload.rowsPerPage
					);
				}

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'alert-codes-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * update state
 * @param state
 * @returns
 */
export const AlertCodesUpdateState =
	(state: SACStateInterface) => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const alertCodes = states.alertCodes;

		// dispatch: updating
		dispatch(updating());

		if (alertCodes && alertCodes.content) {
			const result = {
				...alertCodes.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};
