import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { MouseEvent } from 'react';

import { ReportFormInterface } from '../../../components/common/report/Report.interface';
import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import GeneralService from '../../../screens/business/general/General.service';
import { RootState } from '../..';
import { triggerMessage } from '../../app/App.slice';
import { deserialize } from './GeneralOperations.slice.deserialize';
import { GeneralOperationsTypeEnum } from './GeneralOperations.slice.enum';
import { SliceGeneralOperationsInterface } from './GeneralOperations.slice.interface';

// initial state
export const initialState: SliceGeneralOperationsInterface = {
	orderModes: {
		loading: false,
		content: null
	},
	productCategories: {
		loading: false,
		content: null
	},
	reports: {
		loading: false
	}
};

// slice
const dataSlice = createSlice({
	name: 'General Operations',
	initialState,
	reducers: {
		loading: (state, action) => {
			const { module } = action.payload;
			if (module === GeneralOperationsTypeEnum.ORDER_MODES) {
				state.orderModes.loading = true;
			} else if (module === GeneralOperationsTypeEnum.PRODUCT_CATEGORIES) {
				state.productCategories.loading = true;
			} else if (module === GeneralOperationsTypeEnum.REPORTS) {
				state.reports.loading = true;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === GeneralOperationsTypeEnum.ORDER_MODES) {
				state.orderModes.loading = false;
				response && (state.orderModes.content = response);
			} else if (module === GeneralOperationsTypeEnum.PRODUCT_CATEGORIES) {
				state.productCategories.loading = false;
				response && (state.productCategories.content = response);
			} else if (module === GeneralOperationsTypeEnum.REPORTS) {
				state.reports.loading = false;
			}
		},
		failure: (state, action) => {
			const { module } = action.payload;
			if (module === GeneralOperationsTypeEnum.ORDER_MODES) {
				state.orderModes.loading = false;
			} else if (module === GeneralOperationsTypeEnum.PRODUCT_CATEGORIES) {
				state.productCategories.loading = false;
			} else if (module === GeneralOperationsTypeEnum.REPORTS) {
				state.reports.loading = false;
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const generalOperationsSelector = (state: RootState) => state['generalOperations'];

// reducer
export default dataSlice.reducer;

/**
 * fetch order modes
 * @returns
 */
export const GeneralFetchOrderModes =
	() => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const orderModes = states.generalOperations.orderModes;
		const state = {
			module: GeneralOperationsTypeEnum.ORDER_MODES
		};

		// return on busy
		if (orderModes && orderModes.loading) {
			return;
		}

		// dispatch: loading
		dispatch(loading(state));

		return GeneralService.generalOrderModesFetch()
			.then(async (res) => {
				// deserialize response
				const result = await deserialize(res);

				// dispatch: success
				dispatch(success({ ...state, response: result }));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'operation-order-modes-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'GENERAL.ORDER_MODES.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch product categories
 * @returns
 */
export const GeneralFetchProductCategories =
	() => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const productCategories = states.generalOperations.productCategories;
		const state = {
			module: GeneralOperationsTypeEnum.PRODUCT_CATEGORIES
		};

		// return on busy
		if (productCategories && productCategories.loading) {
			return;
		}

		// dispatch: loading
		dispatch(loading(state));

		return GeneralService.generalProductCategoriesFetch()
			.then(async (res) => {
				// deserialize response
				const result = await deserialize(res);

				// dispatch: success
				dispatch(success({ ...state, response: result }));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'operation-product-categories-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'GENERAL.PRODUCT_CATEGORIES.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * generate reports
 * @param id
 * @param idType
 * @param payload
 * @param callback
 * @returns
 */
export const GeneralReportsGenerate =
	(
		id: string,
		idType: string,
		payload: ReportFormInterface,
		callback: (report: string) => void
	) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: GeneralOperationsTypeEnum.REPORTS
		};

		// dispatch: loading
		dispatch(loading(state));

		return GeneralService.generalReportsGenerate(id, idType, payload)
			.then(async (res) => {
				// callback
				callback(res);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'operation-generate-reports-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'GENERAL.REPORTS.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'operation-generate-reports-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'GENERAL.REPORTS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * copy to clipboard
 * @param event
 * @param value
 * @returns
 */
export const GeneralCopyToClipboard =
	(value: string, event?: MouseEvent<HTMLDivElement>) => async (dispatch: Dispatch) => {
		// stop propagation
		event?.stopPropagation();

		// copy message
		navigator.clipboard.writeText(value);

		// dispatch: trigger message
		const message: TriggerMessageInterface = {
			id: 'row-id-copy',
			show: true,
			severity: TriggerMessageTypeEnum.SUCCESS,
			text: 'GENERAL.COMMON.COPY_TO_CLIPBOARD'
		};
		dispatch(triggerMessage(message));

		return false;
	};
