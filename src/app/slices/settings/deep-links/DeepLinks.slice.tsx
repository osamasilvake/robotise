import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import DeepLinksService from '../../../screens/settings/deep-links/DeepLinks.service';
import { DeepLinksListPayloadInterface } from '../../../screens/settings/deep-links/list/DeepLinksList.interface';
import { DeepLinkCreateEditTypeEnum } from '../../../screens/settings/deep-links/list/table/DeepLinksTable.enum';
import { DialogCreateEditDeepLinkFormInterface } from '../../../screens/settings/deep-links/list/table/DeepLinksTable.interface';
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
						payload.rowsPerPage
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

		return DeepLinksService.siteDeepLinkCreateEdit(deepLinkId, payload, type)
			.then(async (res) => {
				// deserialize response
				let result = await deserializeDeepLink(res);

				if (deepLinks.content) {
					// update created deep link
					result = updateCreatedDeepLink(deepLinks.content, result);

					// dispatch: updated
					dispatch(updated(result));

					// dispatch: trigger message
					const message: TriggerMessageInterface = {
						id: 'create-update-deep-link-success',
						show: true,
						severity: TriggerMessageTypeEnum.SUCCESS,
						text: `DEEP_LINKS.${
							type === DeepLinkCreateEditTypeEnum.CREATE ? 'CREATE' : 'EDIT'
						}.SUCCESS`
					};
					dispatch(triggerMessage(message));

					// callback
					callback();
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
 * @returns
 */
const handleRefreshAndPagination = (
	current: SDLContentInterface,
	result: SDLContentInterface,
	refresh: boolean,
	rowsPerPage: number
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
 * update created deep link
 * @param state
 * @param deepLink
 * @returns
 */
const updateCreatedDeepLink = (
	state: SDLContentInterface,
	deepLink: SDLDataInterface
): SDLContentInterface => ({
	...state,
	data: [deepLink, ...state.data]
});
