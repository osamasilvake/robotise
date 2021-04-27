import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializePurchase } from '../../utilities/serializers/json-api/Purchase.deserialize';
import { deserializePurchases } from '../../utilities/serializers/json-api/Purchases.deserialize';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
import {
	SlicePurchasesInterface,
	SPCDataInterface,
	SPContentInterface
} from './Purchases.slice.interface';

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
 * @param billed
 * @param refresh
 * @returns
 */
export const PurchasesFetchList = (
	robotId: string,
	pageNo: number,
	rowsPerPage: number,
	billed = false,
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

	return RobotsService.robotPurchasesFetch(robotId, pageNo, rowsPerPage, billed)
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
				state: {
					robotId,
					billed
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
 * edit a comment field
 * @param purchaseId
 * @param comment
 * @returns
 */
export const PurchaseEditComment = (purchaseId: string, comment: string) => async (
	dispatch: Dispatch,
	getState: () => AppReducerType
) => {
	// states
	const states = getState();
	const purchases = states.purchases;

	// dispatch: updating
	dispatch(updating());

	return RobotsService.robotPurchaseEditComment(purchaseId, comment)
		.then(async (res) => {
			// deserialize response
			let result = await deserializePurchase(res);

			if (purchases.content) {
				// update edited comment
				result = updateEditedComment(purchases.content, result);

				// dispatch: updated
				dispatch(updated(result));

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'edit-comment-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.PURCHASES.EDIT_COMMENT.SUCCESS'
				};
				dispatch(triggerMessage(message));
			}
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				id: 'edit-comment-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.CANCEL'
			};

			// dispatch: failure
			dispatch(failure(message));
		});
};

/**
 * update billed state
 * @param billed
 * @returns
 */
export const PurchaseUpdateBilled = (billed: boolean) => async (
	dispatch: Dispatch,
	getState: () => AppReducerType
) => {
	// states
	const states = getState();
	const purchases = states.purchases;

	// dispatch: updating
	dispatch(updating());

	if (purchases && purchases.content) {
		const result = {
			...purchases.content,
			state: {
				...purchases.content.state,
				billed
			}
		};

		// dispatch: updated
		dispatch(updated(result));
	}
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

/**
 * update edited comment
 * @param state
 * @param purchase
 * @returns
 */
const updateEditedComment = (
	state: SPContentInterface,
	purchase: SPCDataInterface
): SPContentInterface => {
	return {
		...state,
		data: state.data.map((d) => {
			if (d.id === purchase.id) {
				return purchase;
			}
			return d;
		}),
		dataById: {
			...state.dataById,
			[purchase.id]: purchase
		}
	};
};
