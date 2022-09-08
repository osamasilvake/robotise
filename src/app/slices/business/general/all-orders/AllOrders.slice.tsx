import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { GeneralAllOrdersListPayloadInterface } from '../../../../screens/business/general/all-orders/list/GeneralAllOrdersList.interface';
import GeneralService from '../../../../screens/business/general/General.service';
import { RootState } from '../../..';
import { handleRefreshAndPagination } from '../../../Slices.map';
import { deserializeAllOrders } from './AllOrders.slice.deserialize';
import {
	SAOContentInterface,
	SAOStateInterface,
	SliceAllOrdersInterface
} from './AllOrders.slice.interface';

// initial state
export const initialState: SliceAllOrdersInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'All Orders',
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
export const allOrdersSelector = (state: RootState) => state['allOrders'];

// reducer
export default dataSlice.reducer;

/**
 * fetch all orders
 * @param payload
 * @param refresh
 * @returns
 */
export const AllOrdersFetchList =
	(payload: GeneralAllOrdersListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const allOrders = states.allOrders;

		// return on busy
		if (allOrders && (allOrders.loader || allOrders.loading || allOrders.updating)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return GeneralService.generalAllOrdersFetch(payload)
			.then(async (res) => {
				// deserialize response
				let result: SAOContentInterface = await deserializeAllOrders(res);

				// set state
				result = {
					...result,
					state: {
						...payload,
						siteId: payload.siteId
					}
				};

				// handle refresh and pagination
				if (allOrders && allOrders.content) {
					result = handleRefreshAndPagination(
						allOrders.content,
						result,
						refresh,
						payload.rowsPerPage
					);
				}

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'all-orders-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * update state
 * @param state
 * @returns
 */
export const AllOrderUpdateState =
	(state: SAOStateInterface) => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const allOrders = states.allOrders;

		// dispatch: updating
		dispatch(updating());

		if (allOrders && allOrders.content) {
			const result = {
				...allOrders.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};
