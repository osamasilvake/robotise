import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { GeneralAllElevatorCallsListPayloadInterface } from '../../../../screens/business/general/all-elevator-calls/list/GeneralAllElevatorCallsList.interface';
import GeneralService from '../../../../screens/business/general/General.service';
import { RootState } from '../../..';
import { handleRefreshAndPagination } from '../../../Slices.map';
import { deserializeAllElevatorCalls } from './AllElevatorCalls.slice.deserialize';
import {
	AECContentInterface,
	AECStateInterface,
	SliceAllElevatorCallsInterface
} from './AllElevatorCalls.slice.interface';

// initial state
export const initialState: SliceAllElevatorCallsInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'All Elevator Calls',
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
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, updating, updated, reset } = dataSlice.actions;

// selector
export const allElevatorCallsSelector = (state: RootState) => state['allElevatorCalls'];

// reducer
export default dataSlice.reducer;

/**
 * fetch all elevator calls
 * @param payload
 * @param refresh
 * @returns
 */
export const AllElevatorCallsFetchList =
	(payload: GeneralAllElevatorCallsListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const allElevatorCalls = states.allElevatorCalls;

		// return on busy
		if (allElevatorCalls && (allElevatorCalls.loader || allElevatorCalls.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch all elevator calls
		return GeneralService.generalAllElevatorCallsFetch(payload)
			.then(async (res) => {
				// deserialize response
				let result: AECContentInterface = await deserializeAllElevatorCalls(res);

				// set state
				result = {
					...result,
					state: {
						...payload,
						siteId: payload.siteId
					}
				};

				// handle refresh and pagination
				if (allElevatorCalls && allElevatorCalls.content) {
					result = handleRefreshAndPagination(
						allElevatorCalls.content,
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
					id: 'all-elevator-calls-fetch-error',
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
export const AllElevatorCallsUpdateState =
	(state: AECStateInterface) => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const allElevatorCalls = states.allElevatorCalls;

		// dispatch: updating
		dispatch(updating());

		if (allElevatorCalls && allElevatorCalls.content) {
			const result = {
				...allElevatorCalls.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};
