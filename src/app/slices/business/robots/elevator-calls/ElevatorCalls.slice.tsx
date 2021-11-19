import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { RobotElevatorCallsListPayloadInterface } from '../../../../screens/business/robots/content/elevator-calls/list/RobotElevatorCallsList.interface';
import RobotsService from '../../../../screens/business/robots/Robots.service';
import { AppReducerType } from '../../..';
import { handleRefreshAndPagination } from '../../../Slices.map';
import { deserializeElevatorCalls } from './ElevatorCalls.slice.deserialize';
import {
	ECContentInterface,
	ECCStateInterface,
	SliceElevatorCallsInterface
} from './ElevatorCalls.slice.interface';

// initial state
export const initialState: SliceElevatorCallsInterface = {
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Elevator Calls',
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
export const elevatorCallsSelector = (state: AppReducerType) => state['elevatorCalls'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot elevator calls
 * @param robotId
 * @param payload
 * @param refresh
 * @returns
 */
export const ElevatorCallsFetchList =
	(robotId: string, payload: RobotElevatorCallsListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const elevatorCalls = states.elevatorCalls;

		// return on busy
		if (elevatorCalls && (elevatorCalls.loader || elevatorCalls.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch robot elevator calls
		return RobotsService.robotElevatorCallsFetch(robotId, payload)
			.then(async (res) => {
				// deserialize response
				let result: ECContentInterface = await deserializeElevatorCalls(res);

				// state
				result = {
					...result,
					state: {
						...payload,
						pRobotId: robotId
					}
				};

				// handle refresh and pagination
				if (elevatorCalls && elevatorCalls.content) {
					result = handleRefreshAndPagination(
						elevatorCalls.content,
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
					id: 'elevator-calls-fetch-error',
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
export const ElevatorCallsUpdateState =
	(state: ECCStateInterface) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const elevatorCalls = states.elevatorCalls;

		// dispatch: updating
		dispatch(updating());

		if (elevatorCalls && elevatorCalls.content) {
			const result = {
				...elevatorCalls.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};
