import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { RobotCommandsLogListPayloadInterface } from '../../../../screens/business/robots/content/commands-log/list/RobotCommandsLogList.interface';
import RobotsService from '../../../../screens/business/robots/Robots.service';
import { AppReducerType } from '../../..';
import { deserializeCommandsLog } from './CommandsLog.deserialize';
import {
	CLCDataInterface,
	CLContentInterface,
	CLCStateInterface,
	SliceCommandsLogInterface
} from './CommandsLog.slice.interface';

// initial state
export const initialState: SliceCommandsLogInterface = {
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
export const commandsLogSelector = (state: AppReducerType) => state['commandsLog'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot commands log
 * @param robotId
 * @param payload
 * @param refresh
 * @returns
 */
export const RobotCommandsLogFetch =
	(robotId: string, payload: RobotCommandsLogListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
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

				// state
				result = {
					...result,
					state: payload
				};

				// handle mapping
				result = handleMapping(result);

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
					id: 'fetch-commands-log-error',
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
export const RobotCommandsLogUpdateState =
	(state: CLCStateInterface) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
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

/**
 * handle mapping
 * @param result
 * @returns
 */
const handleMapping = (result: CLContentInterface) => ({
	...result,
	data: result.data.map((item) => mapItem(item))
});

/**
 * map item
 * @param item
 * @returns
 */
const mapItem = (item: CLCDataInterface) => {
	const translation = 'CONTENT.COMMANDS_LOGS';
	return {
		...item,
		command: `${translation}.LIST.TABLE.VALUES.COMMAND.${item.command}`
	};
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
	current: CLContentInterface,
	result: CLContentInterface,
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
