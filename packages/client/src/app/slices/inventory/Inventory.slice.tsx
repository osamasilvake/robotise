import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializeInventory } from '../../utilities/serializers/json-api/Inventory.deserialize';
import { AppReducerType } from '..';
import { ProductsContentItemInterface } from '../products/Products.slice.interface';
import {
	InventoryContentDrawerInterface,
	InventoryContentDrawerLaneInterface,
	InventoryContentInterface,
	InventoryInterface
} from './Inventory.slice.interface';

// initial state
export const initialState: InventoryInterface = {
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Inventory',
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
export const inventorySelector = (state: AppReducerType) => state['inventory'];

// reducer
export default dataSlice.reducer;

/**
 * fetch inventory
 * @param robotId
 * @param refresh
 * @returns
 */
export const InventoryFetchList = (robotId: string, refresh = false) => async (
	dispatch: Dispatch,
	getState: () => AppReducerType
) => {
	// states
	const states = getState();
	const inventory = states.inventory;
	const products = states.products;

	// return on busy
	if (inventory && (inventory.loader || inventory.loading)) {
		return;
	}

	// dispatch: loader/loading
	dispatch(!refresh ? loader() : loading());

	return RobotsService.robotInventoryFetch(robotId)
		.then(async (res) => {
			// deserialize response
			const inventory = await deserializeInventory(res);

			// prepare inventory content
			if (products && products.content) {
				// add products to inventory
				const result = addProductsToInventory(inventory, products.content.data);

				// dispatch: success
				dispatch(success(result));
			}
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				id: 'fetch-inventory-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.FETCH'
			};

			// dispatch: failure
			dispatch(failure(message));
		});
};

/**
 * add products to inventory
 * @param inventory
 * @param products
 * @returns
 */
const addProductsToInventory = (
	inventory: InventoryContentInterface,
	products: ProductsContentItemInterface[]
) => {
	return {
		...inventory,
		drawers: [
			...inventory.drawers.map((drawer: InventoryContentDrawerInterface) => {
				return {
					...drawer,
					lanes: drawer.lanes.map((lane: InventoryContentDrawerLaneInterface) => {
						const product = products.find(
							(p: ProductsContentItemInterface) => p.id === lane.productId
						);
						return {
							...lane,
							product: product || null
						};
					})
				};
			})
		]
	};
};
