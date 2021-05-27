import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import SitesService from '../../screens/business/sites/Sites.service';
import { deserializeSite } from '../../utilities/serializers/json-api/Site.deserialize';
import { AppReducerType } from '..';
import { SliceSiteInterface } from './Site.slice.interface';

// initial state
export const initialState: SliceSiteInterface = {
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Site',
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
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, reset } = dataSlice.actions;

// selector
export const siteSelector = (state: AppReducerType) => state['site'];

// reducer
export default dataSlice.reducer;

/**
 * fetch site
 * @param siteId
 * @param refresh
 * @returns
 */
export const SiteFetch =
	(siteId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const site = states.site;

		// return on busy
		if (site && (site.loader || site.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch site list
		return SitesService.siteFetch(siteId)
			.then(async (res) => {
				// deserialize response
				const result = await deserializeSite(res);

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'fetch-site-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
