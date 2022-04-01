import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { MiddlewareConfigListPayloadInterface } from '../../../screens/settings/middleware-config/list/MiddlewareConfigList.interface';
import MiddlewareConfigService from '../../../screens/settings/middleware-config/MiddlewareConfig.service';
import { AppReducerType } from '../..';
import { handleRefreshAndPagination } from '../../Slices.map';
import {
	SliceMiddlewareConfigInterface,
	SMCContentInterface,
	SMCStateInterface
} from './MiddlewareConfig.interface';
import { deserializeMiddlewareConfig } from './MiddlewareConfig.slice.deserialize';

// initial state
export const initialState: SliceMiddlewareConfigInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Middleware Config',
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
export const middlewareConfigSelector = (state: AppReducerType) => state['middlewareConfig'];

// reducer
export default dataSlice.reducer;

/**
 * fetch middleware config
 * @param payload
 * @param refresh
 * @returns
 */
export const MiddlewareConfigFetchList =
	(payload: MiddlewareConfigListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const middlewareConfig = states.middlewareConfig;

		// return on busy
		if (
			middlewareConfig &&
			(middlewareConfig.loader || middlewareConfig.loading || middlewareConfig.updating)
		) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch middleware config
		return MiddlewareConfigService.middlewareConfigFetch(payload)
			.then(async (res) => {
				// deserialize response
				let result: SMCContentInterface = await deserializeMiddlewareConfig(res);

				// set state
				result = {
					...result,
					state: payload
				};

				// handle refresh and pagination
				if (middlewareConfig && middlewareConfig.content) {
					result = handleRefreshAndPagination(
						middlewareConfig.content,
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
					id: 'middleware-config-fetch-error',
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
export const MiddlewareConfigUpdateState =
	(state: SMCStateInterface) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const middlewareConfig = states.middlewareConfig;

		// dispatch: updating
		dispatch(updating());

		if (middlewareConfig && middlewareConfig.content) {
			const result = {
				...middlewareConfig.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};
