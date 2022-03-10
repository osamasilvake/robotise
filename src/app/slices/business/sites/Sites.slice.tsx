import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { DialogCreateSiteFormInterface } from '../../../screens/business/sites/list/actions/SitesActions.interface';
import SitesService from '../../../screens/business/sites/Sites.service';
import { AppConfigService, StorageService } from '../../../services';
import { timeout } from '../../../utilities/methods/Timeout';
import { AppReducerType } from '../..';
import { triggerMessage } from '../../app/App.slice';
import { deserializeSites } from './Sites.slice.deserialize';
import {
	SliceSitesInterface,
	SSContentInterface,
	SSCStateInterface
} from './Sites.slice.interface';

// storage item
const sitesState = StorageService.get(AppConfigService.StorageItems.SitesState);

// initial state
export const initialState: SliceSitesInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Sites',
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
export const sitesSelector = (state: AppReducerType) => state['sites'];

// reducer
export default dataSlice.reducer;

/**
 * fetch sites
 * @param refresh
 * @returns
 */
export const SitesFetchList =
	(refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const sites = states.sites;
		const state = sites.content?.state || sitesState;

		// return on busy
		if (sites && (sites.loader || sites.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch sites
		return SitesService.sitesFetch()
			.then(async (res) => {
				// deserialize response
				let result: SSContentInterface = await deserializeSites(res);

				// set state
				result = {
					...result,
					state
				};

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'sites-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * create a site
 * @param payload
 * @param callback
 * @returns
 */
export const SiteCreate =
	(payload: DialogCreateSiteFormInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return SitesService.siteRobotCreate(payload)
			.then(async () => {
				// wait
				await timeout(1000);

				// dispatch: updated
				dispatch(updated(null));

				// callback
				callback();

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'sites-create-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.MAIN.CREATE.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'sites-create-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.MAIN.CREATE.ERROR'
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
export const SitesUpdateState =
	(state: SSCStateInterface) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const sites = states.sites;

		// dispatch: updating
		dispatch(updating());

		if (sites && sites.content) {
			const result = {
				...sites.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));

			// storage: sites state
			StorageService.put(AppConfigService.StorageItems.SitesState, state);
		}
	};
