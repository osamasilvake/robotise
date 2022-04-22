import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { RobotCommandsLogListPayloadInterface } from '../../../../screens/business/robots/content/commands-log/list/RobotCommandsLogList.interface';
import RobotsService from '../../../../screens/business/robots/Robots.service';
import { RootState } from '../../..';
import { handleRefreshAndPagination } from '../../../Slices.map';
import { deserializeCommandsLog } from './CommandsLog.slice.deserialize';
import {
	CLContentInterface,
	CLCStateInterface,
	SliceCommandsLogInterface
} from './CommandsLog.slice.interface';

// initial state
export const initialState: SliceCommandsLogInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Commands Log',
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
export const commandsLogSelector = (state: RootState) => state['commandsLog'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot commands log
 * @param robotId
 * @param payload
 * @param refresh
 * @returns
 */
export const CommandsLogFetchList =
	(robotId: string, payload: RobotCommandsLogListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const commandsLog = states.commandsLog;

		// return on busy
		if (commandsLog && (commandsLog.loader || commandsLog.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch robot commands log
		return RobotsService.robotCommandsLogFetch(robotId, payload)
			.then(async (res) => {
				// deserialize response
				let result: CLContentInterface = await deserializeCommandsLog(res);

				// set state
				result = {
					...result,
					state: {
						...payload,
						pRobotId: robotId
					}
				};

				// handle refresh and pagination
				if (commandsLog && commandsLog.content) {
					result = handleRefreshAndPagination(
						commandsLog.content,
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
					id: 'commands-log-fetch-error',
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
export const CommandsLogUpdateState =
	(state: CLCStateInterface) => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const commandsLog = states.commandsLog;

		// dispatch: updating
		dispatch(updating());

		if (commandsLog && commandsLog.content) {
			const result = {
				...commandsLog.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};
