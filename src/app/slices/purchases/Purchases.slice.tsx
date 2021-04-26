import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializePurchases } from '../../utilities/serializers/json-api/Purchases.deserialize';
import { AppReducerType } from '..';
import { SlicePurchasesInterface, SPContentInterface } from './Purchases.slice.interface';

// initial state
export const initialState: SlicePurchasesInterface = {
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Purchases',
	initialState,
	reducers: {
		loader: (state) => {
			state.loader = true;
		},
		loading: (state) => {
			state.loading = true;
		},
		updating: (state) => {
			state.updating = true;
		},
		success: (state, action) => {
			state.loader = false;
			state.loading = false;
			state.content = action.payload;
			state.errors = null;
		},
		updated: (state, action) => {
			state.updating = false;
			state.content = action.payload;
		},
		failure: (state, action) => {
			state.loader = false;
			state.loading = false;
			state.updating = false;
			state.content = null;
			state.errors = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, updating, success, updated, failure, reset } = dataSlice.actions;

// selector
export const purchasesSelector = (state: AppReducerType) => state['purchases'];

// reducer
export default dataSlice.reducer;

/**
 * fetch purchases
 * @param robotId
 * @param pageNo
 * @param rowsPerPage
 * @param refresh
 * @returns
 */
export const PurchasesFetchList = (
	robotId: string,
	pageNo: number,
	rowsPerPage: number,
	refresh = false
) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
	// states
	const states = getState();
	const purchases = states.purchases;

	// return on busy
	if (purchases && (purchases.loader || purchases.loading || purchases.updating)) {
		return;
	}

	// dispatch: loader/loading
	dispatch(!refresh ? loader() : loading());

	return RobotsService.robotPurchasesFetch(robotId, pageNo, rowsPerPage)
		.then(async (res) => {
			// deserialize response
			let result: SPContentInterface = await deserializePurchases(res);

			// prepare content
			result = {
				...result,
				meta: {
					...result.meta,
					rowsPerPage: rowsPerPage
				},
				robot: {
					id: robotId
				}
			};

			// handle pagination state
			result =
				purchases && purchases.content
					? handlePagination(purchases.content, result)
					: result;

			// dispatch: success
			dispatch(success(result));
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				id: 'fetch-orders-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.FETCH'
			};

			// dispatch: failure
			dispatch(failure(message));
		});
};

/**
 * handle pagination
 * @param state
 * @param action
 * @returns
 */
const handlePagination = (state: SPContentInterface, action: SPContentInterface) => {
	const condition1 = action.meta.page > 1; // first page
	const condition2 = action.meta.nextPage > state.meta.nextPage; // between pages
	const condition3 = action.meta.nextPage === null; // last page
	if (condition1 && (condition2 || condition3)) {
		action.meta.nextPage = condition3 ? state.meta.page + 1 : action.meta.nextPage;
		return {
			...state,
			meta: {
				...state.meta,
				...action.meta
			},
			data: [...state.data, ...action.data],
			dataById: {
				...state.dataById,
				...action.dataById
			}
		};
	}
	return action;
};
