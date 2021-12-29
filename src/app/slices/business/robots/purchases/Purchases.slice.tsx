import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { RobotPurchasesListPayloadInterface } from '../../../../screens/business/robots/content/purchases/list/RobotPurchasesList.interface';
import RobotsService from '../../../../screens/business/robots/Robots.service';
import { AppReducerType } from '../../..';
import { triggerMessage } from '../../../general/General.slice';
import { handleRefreshAndPagination } from '../../../Slices.map';
import { deserializePurchase } from './Purchase.slice.deserialize';
import { deserializePurchases } from './Purchases.slice.deserialize';
import {
	SlicePurchasesInterface,
	SPContentInterface,
	SPCStateInterface
} from './Purchases.slice.interface';
import { mapEditedComment } from './Purchases.slice.map';

// initial state
export const initialState: SlicePurchasesInterface = {
	init: false,
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
export const purchasesSelector = (state: AppReducerType) => state['purchases'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot purchases
 * @param robotId
 * @param payload
 * @param refresh
 * @returns
 */
export const PurchasesFetchList =
	(robotId: string, payload: RobotPurchasesListPayloadInterface, refresh = false) =>
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

		return RobotsService.robotPurchasesFetch(robotId, payload)
			.then(async (res) => {
				// deserialize response
				let result: SPContentInterface = await deserializePurchases(res);

				// set state
				result = {
					...result,
					state: {
						...payload,
						pRobotId: robotId
					}
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
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'purchases-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * edit a comment field
 * @param purchaseId
 * @param comment
 * @param callback
 * @returns
 */
export const PurchaseCommentEdit =
	(purchaseId: string, comment: string, callback: () => void) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const purchases = states.purchases;

		// dispatch: updating
		dispatch(updating());

		return RobotsService.robotPurchaseCommentEdit(purchaseId, comment)
			.then(async (res) => {
				// deserialize response
				let result = await deserializePurchase(res);

				if (purchases.content) {
					// map edited comment
					result = mapEditedComment(purchases.content, result);

					// dispatch: updated
					dispatch(updated(result));

					// dispatch: trigger message
					const message: TriggerMessageInterface = {
						id: 'purchases-comment-edit-success',
						show: true,
						severity: TriggerMessageTypeEnum.SUCCESS,
						text: 'ROBOTS.PURCHASES.EDIT_COMMENT.SUCCESS'
					};
					dispatch(triggerMessage(message));

					// callback
					callback();
				}
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'purchases-comment-edit-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.PURCHASES.EDIT_COMMENT.ERROR'
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
	(state: SPCStateInterface) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
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
