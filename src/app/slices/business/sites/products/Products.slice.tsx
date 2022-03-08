import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SiteProductCreateEditTypeEnum } from '../../../../screens/business/sites/content/products/list/table/SiteProductsTable.enum';
import { DialogCreateEditProductFormInterface } from '../../../../screens/business/sites/content/products/list/table/SiteProductsTable.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { timeout } from '../../../../utilities/methods/Timeout';
import { AppReducerType } from '../../..';
import { triggerMessage } from '../../../general/General.slice';
import { deserializeProducts } from './Products.slice.deserialize';
import {
	SliceProductsInterface,
	SPCDataInterface,
	SPContentInterface
} from './Products.slice.interface';

// initial state
export const initialState: SliceProductsInterface = {
	init: false,
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
		updated: (state) => {
			state.updating = false;
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
 * fetch site products
 * @param siteId
 * @param refresh
 * @returns
 */
export const ProductsFetchList =
	(siteId?: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const products = states.products;

		// return on busy
		if (products && (products.loader || products.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return SitesService.siteProductsFetch(siteId)
			.then(async (res) => {
				// deserialize response
				let result: SPContentInterface = await deserializeProducts(res);

				// set state
				result = {
					...result,
					state: {
						pSiteId: siteId
					}
				};

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'products-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * create/edit product
 * @param siteId
 * @param productId
 * @param payload
 * @param type
 * @param callback
 * @returns
 */
export const ProductCreateEdit =
	(
		siteId: string,
		productId: string | undefined,
		payload: DialogCreateEditProductFormInterface,
		type: SiteProductCreateEditTypeEnum,
		callback: () => void
	) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return SitesService.siteProductCreateEdit(siteId, productId, payload, type)
			.then(async () => {
				// wait
				await timeout(1000);

				// callback
				callback();

				// wait
				await timeout(2000);

				// dispatch: updated
				dispatch(updated());

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'products-create-update-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `SITES.PRODUCTS.${
						type === SiteProductCreateEditTypeEnum.CREATE ? 'CREATE' : 'EDIT'
					}.SUCCESS`
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'products-create-update-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `SITES.PRODUCTS.${
						type === SiteProductCreateEditTypeEnum.CREATE ? 'CREATE' : 'EDIT'
					}.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * delete product
 * @param product
 * @param callback
 * @returns
 */
export const ProductDelete =
	(product: SPCDataInterface, callback: () => void) => async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return SitesService.siteProductDelete(product.id)
			.then(async () => {
				// wait
				await timeout(1000);

				// callback
				callback();

				// wait
				await timeout(2000);

				// dispatch: updated
				dispatch(updated());

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'products-delete-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.PRODUCTS.DELETE.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'products-delete-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.PRODUCTS.DELETE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};
