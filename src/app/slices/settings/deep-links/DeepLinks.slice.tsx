import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import DeepLinksService from '../../../screens/settings/deep-links/DeepLinks.service';
import { DeepLinksListPayloadInterface } from '../../../screens/settings/deep-links/list/DeepLinksList.interface';
import {
	DeepLinkCreateEditTypeEnum,
	DeepLinkResetTypeEnum
} from '../../../screens/settings/deep-links/list/table/DeepLinksTable.enum';
import { DialogCreateEditDeepLinkFormInterface } from '../../../screens/settings/deep-links/list/table/DeepLinksTable.interface';
import { timeout } from '../../../utilities/methods/Timeout';
import { AppReducerType } from '../..';
import { triggerMessage } from '../../general/General.slice';
import { deserializeDeepLink } from './DeepLink.deserialize';
import { deserializeDeepLinks } from './DeepLinks.deserialize';
import {
	SDLContentInterface,
	SDLDataInterface,
	SDLStateInterface,
	SliceDeepLinksInterface
} from './DeepLinks.interface';

// initial state
export const initialState: SliceDeepLinksInterface = {
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Deep Links',
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
export const deepLinksSelector = (state: AppReducerType) => state['deepLinks'];

// reducer
export default dataSlice.reducer;

/**
 * fetch deep links
 * @param payload
 * @param refresh
 * @returns
 */
export const DeepLinksFetchList =
	(payload: DeepLinksListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const deepLinks = states.deepLinks;

		// return on busy
		if (deepLinks && (deepLinks.loader || deepLinks.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch deep links
		return DeepLinksService.deepLinksFetch(payload)
			.then(async (res) => {
				// deserialize response
				let result: SDLContentInterface = await deserializeDeepLinks(res);

				// state
				result = {
					...result,
					state: payload
				};

				// handle refresh and pagination
				if (deepLinks && deepLinks.content) {
					result = handleRefreshAndPagination(
						deepLinks.content,
						result,
						refresh,
						payload.rowsPerPage,
						payload.reset === DeepLinkResetTypeEnum.RESET
					);
				}

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'fetch-deep-links-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * create/edit deep link
 * @param deepLinkId
 * @param payload
 * @param type
 * @param callback
 * @returns
 */
export const DeepLinkCreateEdit =
	(
		deepLinkId: string | undefined,
		payload: DialogCreateEditDeepLinkFormInterface,
		type: DeepLinkCreateEditTypeEnum,
		callback: () => void
	) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const deepLinks = states.deepLinks;

		// dispatch: updating
		dispatch(updating());

		return DeepLinksService.deepLinkCreateEdit(deepLinkId, payload, type)
			.then(async (res) => {
				// deserialize response
				let result = await deserializeDeepLink(res);

				// trigger message
				const message: TriggerMessageInterface = {
					id: 'create-update-deep-link-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `DEEP_LINKS.${
						type === DeepLinkCreateEditTypeEnum.CREATE ? 'CREATE' : 'EDIT'
					}.SUCCESS`
				};

				if (deepLinks.content) {
					if (type === DeepLinkCreateEditTypeEnum.CREATE) {
						// dispatch: updated
						dispatch(updated(null));

						// callback
						callback();

						// wait
						await timeout(1000);

						// dispatch: trigger message
						dispatch(triggerMessage(message));
					} else {
						// update deep link
						result = updateDeepLink(deepLinks.content, result);

						// dispatch: updated
						dispatch(updated(result));

						// dispatch: trigger message
						dispatch(triggerMessage(message));

						// callback
						callback();
					}
				}
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'create-update-deep-link-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `DEEP_LINKS.${
						type === DeepLinkCreateEditTypeEnum.CREATE ? 'CREATE' : 'EDIT'
					}.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * delete deep link
 * @param deepLink
 * @param callback
 * @returns
 */
export const DeepLinkDelete =
	(deepLink: SDLDataInterface, callback: () => void) => async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return DeepLinksService.deepLinkDelete(deepLink.id)
			.then(async () => {
				// dispatch: updated
				dispatch(updated(null));

				// callback
				callback();

				// wait
				await timeout(1000);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'delete-deep-link-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'DEEP_LINKS.DELETE.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'delete-deep-link-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.DELETE.ERROR'
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
export const DeepLinksUpdateState =
	(state: SDLStateInterface) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const DeepLinks = states.deepLinks;

		if (DeepLinks && DeepLinks.content) {
			const result = {
				...DeepLinks.content,
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
 * @param reset
 * @returns
 */
const handleRefreshAndPagination = (
	current: SDLContentInterface,
	result: SDLContentInterface,
	refresh: boolean,
	rowsPerPage: number,
	reset: boolean
) => {
	if (refresh) {
		const dataItems = current.data.slice(rowsPerPage);
		return {
			...current,
			data: [...result.data, ...dataItems],
			meta: current.meta && {
				...current.meta,
				totalDocs: result.meta.totalDocs,
				totalPages: result.meta.totalPages
			}
		};
	} else if (result?.meta?.page > 1) {
		if (reset) {
			return result;
		}
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

/**
 * update deep link
 * @param state
 * @param deepLink
 * @returns
 */
const updateDeepLink = (
	state: SDLContentInterface,
	deepLink: SDLDataInterface
): SDLContentInterface => ({
	...state,
	data: state.data.map((item) => (item.id === deepLink.id ? deepLink : item))
});
