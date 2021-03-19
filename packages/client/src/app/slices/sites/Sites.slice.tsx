import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import SitesService from '../../screens/business/sites/Sites.service';
import { deserializeSites } from '../../utilities/serializers/json-api/JsonApi';
import { RootStateInterface } from '../Slices.interface';
import { SSInterface } from './Sites.slice.interface';

// initial state
export const initialState: SSInterface = {
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Sites',
	initialState,
	reducers: {
		loading: (state) => {
			state.loading = true;
		},
		success: (state, action) => {
			state.loading = false;
			state.content = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.loading = false;
			state.content = null;
			state.errors = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const sitesSelector = (state: RootStateInterface) => state['sites'];

// reducer
export default dataSlice.reducer;

/**
 * fetch sites list
 */
export const SitesFetchList = () => async (dispatch: Dispatch) => {
	// dispatch: loader
	dispatch(loading());

	// fetch sites list
	SitesService.sitesFetch()
		.then(async (res) => {
			// deserialize response
			const result = await deserializeSites(res);

			// dispatch: success
			dispatch(success(result));
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.FETCH'
			};

			// dispatch: error
			dispatch(failure(message));
		});
};
