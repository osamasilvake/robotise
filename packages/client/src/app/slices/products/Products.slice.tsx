import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import SitesService from '../../screens/business/sites/Sites.service';
import { deserializeProducts } from '../../utilities/serializers/json-api/Products.deserialize';
import { AppReducerType } from '..';
import { ProductsInterface } from './Products.slice.interface';

// initial state
export const initialState: ProductsInterface = {
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Products',
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
export const productsSelector = (state: AppReducerType) => state['products'];

// reducer
export default dataSlice.reducer;

/**
 * fetch products
 * @param siteId
 * @param refresh
 * @returns
 */
export const ProductsFetchList = (siteId: string, refresh = false) => async (
	dispatch: Dispatch,
	getState: () => AppReducerType
) => {
	// states
	const states = getState();
	const inventory = states.inventory;

	// return on busy
	if (inventory && (inventory.loader || inventory.loading)) {
		return;
	}

	// dispatch: loader/loading
	dispatch(!refresh ? loader() : loading());

	return SitesService.siteProductsFetch(siteId)
		.then(async (res) => {
			// deserialize response
			const result = await deserializeProducts(res);

			// dispatch: success
			dispatch(success(result));
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				id: 'fetch-products-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.FETCH'
			};

			// dispatch: failure
			dispatch(failure(message));
		});
};
