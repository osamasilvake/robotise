import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { SiteProductCreateEditTypeEnum } from '../../screens/business/sites/content/products/list/table/SiteProductsTable.enum';
import { DialogCreateEditProductPayloadInterface } from '../../screens/business/sites/content/products/list/table/SiteProductsTable.interface';
import SitesService from '../../screens/business/sites/Sites.service';
import { deserializeProduct } from '../../utilities/serializers/json-api/Product.deserialize';
import { deserializeProducts } from '../../utilities/serializers/json-api/Products.deserialize';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
import {
	SliceProductsInterface,
	SPCDataInterface,
	SPContentInterface
} from './Products.slice.interface';

// initial state
export const initialState: SliceProductsInterface = {
	loader: false,
	loading: false,
	updating: false,
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
export const productsSelector = (state: AppReducerType) => state['products'];

// reducer
export default dataSlice.reducer;

/**
 * fetch products
 * @param siteId
 * @param refresh
 * @returns
 */
export const ProductsFetchList =
	(siteId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const products = states.products;

		// return on busy
		if (products && (products.loader || products.loading || products.updating)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return SitesService.siteProductsFetch(siteId)
			.then(async (res) => {
				// deserialize response
				let result: SPContentInterface = await deserializeProducts(res);

				// prepare content
				result = {
					...result,
					site: {
						id: siteId
					}
				};

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

/**
 * create/edit a product
 * @param payload
 * @param type
 * @param siteId
 * @param productId
 * @returns
 */
export const ProductCreateEdit =
	(
		payload: DialogCreateEditProductPayloadInterface,
		type: SiteProductCreateEditTypeEnum,
		siteId: string,
		productId: string | undefined
	) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const products = states.products;

		// dispatch: updating
		dispatch(updating());

		return SitesService.siteProductCreateEdit(payload, type, siteId, productId)
			.then(async (res) => {
				// deserialize response
				let result = await deserializeProduct(res);

				if (products.content) {
					// update created/edited product
					result = updateCreatedEditedProduct(products.content, result, type);

					// dispatch: updated
					dispatch(updated(result));

					// dispatch: trigger message
					const message: TriggerMessageInterface = {
						id: 'create-update-product-success',
						show: true,
						severity: TriggerMessageTypeEnum.SUCCESS,
						text: `SITES.PRODUCTS.${
							type === SiteProductCreateEditTypeEnum.CREATE
								? 'PURCHASE_CREATE'
								: 'PURCHASE_EDIT'
						}.SUCCESS`
					};
					dispatch(triggerMessage(message));
				}
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'create-update-product-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'API.CANCEL'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * update created/edited product
 * @param state
 * @param product
 * @param type
 * @returns
 */
const updateCreatedEditedProduct = (
	state: SPContentInterface,
	product: SPCDataInterface,
	type: SiteProductCreateEditTypeEnum
): SPContentInterface => {
	return type === SiteProductCreateEditTypeEnum.CREATE
		? {
				...state,
				data: [product, ...state.data],
				dataById: {
					[product.id]: product,
					...state.dataById
				}
		  }
		: {
				...state,
				data: state.data.map((d) => {
					if (d.id === product.id) {
						return product;
					}
					return d;
				}),
				dataById: {
					...state.dataById,
					[product.id]: product
				}
		  };
};
