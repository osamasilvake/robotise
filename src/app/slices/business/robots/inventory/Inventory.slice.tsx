import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import RobotsService from '../../../../screens/business/robots/Robots.service';
import { RootState } from '../../..';
import { deserializeInventory } from './Inventory.slice.deserialize';
import { SIContentInterface, SliceInventoryInterface } from './Inventory.slice.interface';
import { filterDrawers } from './Inventory.slice.map';

// initial state
export const initialState: SliceInventoryInterface = {
	init: false,
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
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, reset } = dataSlice.actions;

// selector
export const inventorySelector = (state: RootState) => state['inventory'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot inventory
 * @param robotId
 * @param refresh
 * @returns
 */
export const InventoryFetchList =
	(robotId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const inventory = states.inventory;

		// return on busy
		if (inventory && (inventory.loader || inventory.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return RobotsService.robotInventoryFetch(robotId)
			.then(async (res) => {
				// deserialize response
				let result: SIContentInterface = await deserializeInventory(res);

				// filter drawers
				result = filterDrawers(result);

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'inventory-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
