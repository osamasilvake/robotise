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
import { handleRefreshAndPagination } from '../../Slices.map';
import { deserializeDeepLink } from './DeepLink.slice.deserialize';
import {
	SDLContentInterface,
	SDLDataInterface,
	SDLStateInterface,
	SliceDeepLinksInterface
} from './DeepLinks.interface';
import { deserializeDeepLinks } from './DeepLinks.slice.deserialize';

// initial state
export const initialState: SliceDeepLinksInterface = {
	init: false,
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
		if (deepLinks && (deepLinks.loader || deepLinks.loading || deepLinks.updating)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch deep links
		return DeepLinksService.deepLinksFetch(payload)
			.then(async (res) => {
				// deserialize response
				let result: SDLContentInterface = await deserializeDeepLinks(res);

				// set state
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
					id: 'deep-links-fetch-error',
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
					id: 'deep-links-create-update-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `DEEP_LINKS.${
						type === DeepLinkCreateEditTypeEnum.CREATE ? 'CREATE' : 'EDIT'
					}.SUCCESS`
				};

				if (type === DeepLinkCreateEditTypeEnum.CREATE) {
					// wait
					await timeout(1000);

					// callback
					callback();

					// wait
					await timeout(1000);

					// dispatch: updated
					dispatch(updated(null));

					// dispatch: trigger message
					dispatch(triggerMessage(message));
				} else {
					if (deepLinks.content) {
						// update deep link
						result = updateDeepLink(deepLinks.content, result);

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
					id: 'deep-links-create-update-error',
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
				// wait
				await timeout(1000);

				// callback
				callback();

				// wait
				await timeout(1000);

				// dispatch: updated
				dispatch(updated(null));

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-links-delete-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'DEEP_LINKS.DELETE.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-links-delete-error',
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

		// dispatch: updating
		dispatch(updating());

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
