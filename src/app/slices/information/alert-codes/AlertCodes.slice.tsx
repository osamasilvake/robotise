import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import AlertCodesService from '../../../screens/information/alert-codes/AlertCodes.service';
import { AlertCodesListPayloadInterface } from '../../../screens/information/alert-codes/list/AlertCodesList.interface';
import { AppReducerType } from '../..';
import { deserializeAlertCodes } from './AlertCodes.deserialize';
import {
	SACContentInterface,
	SACStateInterface,
	SliceAlertCodesInterface
} from './AlertCodes.interface';

// initial state
export const initialState: SliceAlertCodesInterface = {
	loader: false,
	loading: false,
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
			state.loader = false;
			state.loading = false;
			state.content = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.loader = false;
			state.loading = false;
			state.content = null;
			state.errors = action.payload;
		},
		updated: (state, action) => {
			state.content = action.payload;
		},

		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, updated, reset } = dataSlice.actions;

// selector
export const alertCodesSelector = (state: AppReducerType) => state['alertCodes'];

// reducer
export default dataSlice.reducer;

/**
 * fetch alert codes
 * @param payload
 * @param refresh
 * @returns
 */
export const AlertCodesFetch =
	(payload: AlertCodesListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
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

				// state
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
					id: 'fetch-alert-codes-error',
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
	(state: SACStateInterface) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const alertCodes = states.alertCodes;

		if (alertCodes && alertCodes.content) {
			const result = {
				...alertCodes.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};

/**
 * handle refresh and pagination
 * @param current
 * @param result
 * @param refresh
 * @param rowsPerPage
 * @returns
 */
const handleRefreshAndPagination = (
	current: SACContentInterface,
	result: SACContentInterface,
	refresh: boolean,
	rowsPerPage: number
) => {
	if (refresh) {
		const dataItems = current.data.slice(rowsPerPage);
		return {
			...current,
			data: [...result.data, ...dataItems],
			meta: {
				...current.meta,
				totalDocs: result.meta.totalDocs,
				totalPages: result.meta.totalPages
			}
		};
	} else if (result.meta.page > 1) {
		return {
			...current,
			meta: {
				...current.meta,
				...result.meta
			},
			data: [...current.data, ...result.data]
		};
	}
	return result;
};
