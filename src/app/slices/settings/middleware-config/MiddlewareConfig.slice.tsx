import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { MiddlewareConfigListPayloadInterface } from '../../../screens/settings/middleware-config/list/MiddlewareConfigList.interface';
import {
	MiddlewareConfigCreateEditTypeEnum,
	MiddlewareConfigResetTypeEnum
} from '../../../screens/settings/middleware-config/list/table/MiddlewareConfigTable.enum';
import { DialogCreateEditMiddlewareConfigFormInterface } from '../../../screens/settings/middleware-config/list/table/MiddlewareConfigTable.interface';
import MiddlewareConfigService from '../../../screens/settings/middleware-config/MiddlewareConfig.service';
import { timeout } from '../../../utilities/methods/Timeout';
import { RootState } from '../..';
import { triggerMessage } from '../../app/App.slice';
import { handleRefreshAndPagination } from '../../Slices.map';
import {
	SliceMiddlewareConfigInterface,
	SMCContentInterface,
	SMCDataInterface,
	SMCStateInterface
} from './MiddlewareConfig.interface';
import {
	deserializeMiddlewareConfig,
	deserializeMiddlewareConfigs
} from './MiddlewareConfig.slice.deserialize';

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
export const middlewareConfigSelector = (state: RootState) => state['middlewareConfig'];

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
	async (dispatch: Dispatch, getState: () => RootState) => {
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
				let result: SMCContentInterface = await deserializeMiddlewareConfigs(res);

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
						payload.rowsPerPage,
						payload.reset === MiddlewareConfigResetTypeEnum.RESET
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
 * create/edit middleware config
 * @param middlewareConfigId
 * @param payload
 * @param type
 * @param callback
 * @returns
 */
export const MiddlewareConfigCreateEdit =
	(
		middlewareConfigId: string | undefined,
		payload: DialogCreateEditMiddlewareConfigFormInterface,
		type: MiddlewareConfigCreateEditTypeEnum,
		callback: () => void
	) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const middlewareConfig = states.middlewareConfig;

		// dispatch: updating
		dispatch(updating());

		return MiddlewareConfigService.middlewareConfigCreateEdit(middlewareConfigId, payload, type)
			.then(async (res) => {
				// deserialize response
				let result = await deserializeMiddlewareConfig(res);

				// trigger message
				const message: TriggerMessageInterface = {
					id: 'middleware-config-create-update-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `MIDDLEWARE_CONFIG.${
						type === MiddlewareConfigCreateEditTypeEnum.CREATE ? 'CREATE' : 'EDIT'
					}.SUCCESS`
				};

				if (type === MiddlewareConfigCreateEditTypeEnum.CREATE) {
					// wait
					await timeout(1000);

					// dispatch: updated
					dispatch(updated(null));

					// callback
					callback();

					// wait
					await timeout(1000);

					// dispatch: trigger message
					dispatch(triggerMessage(message));
				} else {
					if (middlewareConfig.content) {
						// update middleware config
						result = updateMiddlewareConfig(middlewareConfig.content, result);

						// dispatch: updated
						dispatch(updated(result));
					}

					// dispatch: trigger message
					dispatch(triggerMessage(message));

					// callback
					callback();
				}
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'middleware-config-create-update-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `MIDDLEWARE_CONFIG.${
						type === MiddlewareConfigCreateEditTypeEnum.CREATE ? 'CREATE' : 'EDIT'
					}.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * delete middleware config
 * @param middlewareConfig
 * @param callback
 * @returns
 */
export const MiddlewareConfigDelete =
	(middlewareConfig: SMCDataInterface, callback: () => void) => async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return MiddlewareConfigService.middlewareConfigDelete(middlewareConfig.id)
			.then(async () => {
				// wait
				await timeout(1000);

				// dispatch: updated
				dispatch(updated(null));

				// callback
				callback();

				// wait
				await timeout(1000);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'middleware-config-delete-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'MIDDLEWARE_CONFIG.DELETE.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'middleware-config-delete-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'MIDDLEWARE_CONFIG.DELETE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * update state
 * @param state
 * @returns
 */
export const MiddlewareConfigUpdateState =
	(state: SMCStateInterface) => async (dispatch: Dispatch, getState: () => RootState) => {
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

/**
 * update middleware config
 * @param state
 * @param middlewareConfig
 * @returns
 */
const updateMiddlewareConfig = (
	state: SMCContentInterface,
	middlewareConfig: SMCDataInterface
): SMCContentInterface => ({
	...state,
	data: state.data.map((item) => (item.id === middlewareConfig.id ? middlewareConfig : item))
});
