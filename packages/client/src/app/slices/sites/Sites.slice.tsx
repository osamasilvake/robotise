import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import SitesService from '../../screens/business/sites/Sites.service';
import { deserializeSites } from '../../utilities/serializers/json-api/Sites.deserialize';
import { AppReducerType } from '..';
import { SSInterface } from './Sites.slice.interface';

// initial state
export const initialState: SSInterface = {
	loader: false,
	loading: false,
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
export const sitesSelector = (state: AppReducerType) => state['sites'];

// reducer
export default dataSlice.reducer;

/**
 * fetch sites list
 * @param refresh
 * @returns
 */
export const SitesFetchList = (refresh = false) => async (
	dispatch: Dispatch,
	getState: () => AppReducerType
) => {
	// states
	const states = getState();
	const sites = states.sites;

	// return on busy
	if (sites && sites.loading) {
		return;
	}

	// dispatch: loader/loading
	dispatch(!refresh ? loader() : loading());

	// fetch sites list
	return SitesService.sitesFetch()
		.then(async (res) => {
			// deserialize response
			const result = await deserializeSites(res);

			// dispatch: success
			dispatch(success(result));
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				id: 'fetch-sites-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.FETCH'
			};

			// dispatch: failure
			dispatch(failure(message));
		});
};
