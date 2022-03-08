import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { ReportFormInterface } from '../../../components/common/report/Report.interface';
import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import GeneralService from '../../../screens/business/general/General.service';
import { AppReducerType } from '../..';
import { triggerMessage } from '../../general/General.slice';
import { deserializeOrderModes } from './GeneralOperations.slice.deserialize';
import { GeneralOperationsTypeEnum } from './GeneralOperations.slice.enum';
import { SliceGeneralOperationsInterface } from './GeneralOperations.slice.interface';
import { mapOrderModes } from './GeneralOperations.slice.map';

// initial state
export const initialState: SliceGeneralOperationsInterface = {
	orderModes: {
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
			} else if (module === GeneralOperationsTypeEnum.REPORTS) {
				state.reports.loading = true;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === GeneralOperationsTypeEnum.ORDER_MODES) {
				state.orderModes.loading = false;
				response && (state.orderModes.content = response);
			} else if (module === GeneralOperationsTypeEnum.REPORTS) {
				state.reports.loading = false;
			}
		},
		failure: (state, action) => {
			const { module } = action.payload;
			if (module === GeneralOperationsTypeEnum.ORDER_MODES) {
				state.orderModes.loading = false;
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
export const generalOperationsSelector = (state: AppReducerType) => state['generalOperations'];

// reducer
export default dataSlice.reducer;

/**
 * fetch order modes
 * @returns
 */
export const GeneralFetchOrderModes = () => async (dispatch: Dispatch) => {
	const state = {
		module: GeneralOperationsTypeEnum.ORDER_MODES
	};

	// dispatch: loading
	dispatch(loading(state));

	return GeneralService.generalOrderModesFetch()
		.then(async (res) => {
			// deserialize response
			let result = await deserializeOrderModes(res);

			// map order modes
			const mappedResult = mapOrderModes(result.data);
			result = {
				...result,
				data: mappedResult.data,
				dataById: mappedResult.dataById
			};

			// dispatch: success
			dispatch(success({ ...state, response: result }));
		})
		.catch(() => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'general-order-modes-fetch-error',
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
					id: 'general-operations-generate-reports-success',
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
					id: 'general-operations-generate-reports-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'GENERAL.REPORTS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};
