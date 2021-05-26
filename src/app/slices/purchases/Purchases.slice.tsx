import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { RobotPurchasesFetchListInterface } from '../../screens/business/robots/content/purchases/list/table/RobotPurchasesTable.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializePurchase } from '../../utilities/serializers/json-api/Purchase.deserialize';
import { deserializePurchases } from '../../utilities/serializers/json-api/Purchases.deserialize';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
import {
	SlicePurchasesInterface,
	SPCDataInterface,
	SPContentInterface,
	SPCState
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
export const purchasesSelector = (state: AppReducerType) => state['purchases'];

// reducer
export default dataSlice.reducer;

/**
 * fetch purchases
 * @param payload
 * @param refresh
 * @returns
 */
export const PurchasesFetchList =
	(payload: RobotPurchasesFetchListInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const purchases = states.purchases;

		// return on busy
		if (purchases && (purchases.loader || purchases.loading || purchases.updating)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return RobotsService.robotPurchasesFetch(payload)
			.then(async (res) => {
				// deserialize response
				let result: SPContentInterface = await deserializePurchases(res);

				// state
				result = {
					...result,
					state: payload
				};

				// handle refresh and pagination
				if (purchases && purchases.content) {
					result = handleRefreshAndPagination(
						purchases.content,
						result,
						refresh,
						payload.rowsPerPage
					);
				}

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				const message: TriggerMessageInterface = {
					id: 'fetch-purchases-error',
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
export const PurchaseEditComment =
	(purchaseId: string, comment: string) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
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
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'edit-comment-error',
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
 * update state
 * @param state
 * @returns
 */
export const PurchaseUpdateState =
	(state: SPCState) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const purchases = states.purchases;

		if (purchases && purchases.content) {
			const result = {
				...purchases.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};

/**
 * handle refresh and pagination
 * @param current
 * @param result
 * @param refresh
 * @param rowsPerPage
 * @returns
 */
const handleRefreshAndPagination = (
	current: SPContentInterface,
	result: SPContentInterface,
	refresh: boolean,
	rowsPerPage: number
) => {
	if (refresh) {
		const dataItems = current.data.slice(rowsPerPage);
		return {
			...current,
			data: [...result.data, ...dataItems],
			dataById: {
				...current.dataById,
				...result.dataById
			},
			meta: {
				...current.meta,
				totalDocs: result.meta.totalDocs,
				totalPages: result.meta.totalPages
			}
		};
	} else if (result.meta.page > 1) {
		return {
			...current,
			meta: {
				...current.meta,
				...result.meta
			},
			data: [...current.data, ...result.data],
			dataById: {
				...current.dataById,
				...result.dataById
			}
		};
	}
	return result;
};

/**
 * update edited comment
 * @param current
 * @param purchase
 * @returns
 */
const updateEditedComment = (
	current: SPContentInterface,
	purchase: SPCDataInterface
): SPContentInterface => {
	return {
		...current,
		data: current.data.map((item) => {
			if (item.id === purchase.id) {
				return purchase;
			}
			return item;
		}),
		dataById: {
			...current.dataById,
			[purchase.id]: purchase
		}
	};
};
