import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { RobotLogsListPayloadInterface } from '../../../../screens/business/robots/content/logs/list/RobotLogsList.interface';
import RobotsService from '../../../../screens/business/robots/Robots.service';
import { AppReducerType } from '../../..';
import { deserializeLogs } from './Logs.deserialize';
import {
	SLCDataInterface,
	SLContentInterface,
	SLCStateInterface,
	SliceLogsInterface
} from './Logs.slice.interface';

// initial state
export const initialState: SliceLogsInterface = {
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Logs',
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
export const logsSelector = (state: AppReducerType) => state['logs'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot commands logs
 * @param robotId
 * @param payload
 * @param refresh
 * @returns
 */
export const LogsFetch =
	(robotId: string, payload: RobotLogsListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const logs = states.logs;

		// return on busy
		if (logs && (logs.loader || logs.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch robot commands logs
		return RobotsService.robotRequestCommandsLog(robotId, payload)
			.then(async (res) => {
				// deserialize response
				let result: SLContentInterface = await deserializeLogs(res);

				// state
				result = {
					...result,
					state: payload
				};

				// handle mapping
				result = handleMapping(result);

				// handle refresh and pagination
				if (logs && logs.content) {
					result = handleRefreshAndPagination(
						logs.content,
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
					id: 'fetch-logs-error',
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
export const LogUpdateState =
	(state: SLCStateInterface) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const logs = states.logs;

		// dispatch: updating
		dispatch(updating());

		if (logs && logs.content) {
			const result = {
				...logs.content,
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
const handleMapping = (result: SLContentInterface) => ({
	...result,
	data: result.data.map((item) => mapItem(item))
});

/**
 * map item
 * @param item
 * @returns
 */
const mapItem = (item: SLCDataInterface) => {
	const common = 'CONTENT.LOGS';
	return {
		...item,
		command: `${common}.LIST.TABLE.VALUES.COMMAND.${item.command}`
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
	current: SLContentInterface,
	result: SLContentInterface,
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
