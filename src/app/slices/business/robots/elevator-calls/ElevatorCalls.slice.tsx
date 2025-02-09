import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { RobotElevatorCallsListPayloadInterface } from '../../../../screens/business/robots/content/elevator-calls/list/RobotElevatorCallsList.interface';
import { RobotElevatorCallsManualTestTypeEnum } from '../../../../screens/business/robots/content/elevator-calls/list/table/RobotElevatorCallsTable.enum';
import { RobotElevatorCallsTemplateAxiosGetInterface } from '../../../../screens/business/robots/Robots.interface';
import RobotsService from '../../../../screens/business/robots/Robots.service';
import { timeout } from '../../../../utilities/methods/Timeout';
import { RootState } from '../../..';
import { triggerMessage } from '../../../app/App.slice';
import { handleRefreshAndPagination } from '../../../Slices.map';
import { deserializeElevatorCalls } from './ElevatorCalls.slice.deserialize';
import {
	ECContentInterface,
	ECCStateInterface,
	SliceElevatorCallsInterface
} from './ElevatorCalls.slice.interface';

// initial state
export const initialState: SliceElevatorCallsInterface = {
	init: false,
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
export const elevatorCallsSelector = (state: RootState) => state['elevatorCalls'];

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
	async (dispatch: Dispatch, getState: () => RootState) => {
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

				// set state
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
	(state: ECCStateInterface) => async (dispatch: Dispatch, getState: () => RootState) => {
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

/**
 * fetch elevator calls test
 * @param siteId
 * @param callback
 * @returns
 */
export const ElevatorCallsTestFetch =
	(siteId: string, callback: () => void) => async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		// call
		return RobotsService.robotElevatorCallsTestFetch(siteId)
			.then(() => {
				// dispatch: updated
				dispatch(updated(null));

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'elevator-calls-test-fetch-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.ELEVATOR_CALLS.TEST_CALL.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// callback
				callback();
			})
			.catch((err: Error) => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'elevator-calls-test-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: err?.message || 'ROBOTS.ELEVATOR_CALLS.TEST_CALL.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * fetch elevator calls template
 * @param elevatorId
 * @param callback
 * @returns
 */
export const ElevatorCallsTemplateFetch =
	(elevatorId: string, callback: (data: RobotElevatorCallsTemplateAxiosGetInterface) => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		// wait
		await timeout(1000);

		// call
		return RobotsService.robotElevatorCallsTemplateFetch(elevatorId)
			.then(async (res) => {
				// dispatch: updated
				dispatch(updated(null));

				// callback
				callback(res);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'elevator-calls-template-fetch-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.ELEVATOR_CALLS.TEMPLATE.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'elevator-calls-template-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.ELEVATOR_CALLS.TEMPLATE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * test manual elevator calls
 * @param callType
 * @param callId
 * @param liftId
 * @param callback
 * @returns
 */
export const ElevatorCallsManualTest =
	(
		callType: RobotElevatorCallsManualTestTypeEnum,
		callId: string,
		liftId = '',
		callback?: () => void
	) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		// test elevator call
		return RobotsService.robotElevatorCallsManualTest(callType, callId, liftId)
			.then(() => {
				// dispatch: updated
				dispatch(updated(null));

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'elevator-manual-call-test-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.ELEVATOR_CALLS.MANUAL_CALL.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// callback
				callback && callback();
			})
			.catch((err: Error) => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'elevator-manual-call-test-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: err?.message || 'ROBOTS.ELEVATOR_CALLS.MANUAL_CALL.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};
