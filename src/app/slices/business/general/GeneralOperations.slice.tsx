import { createSlice, Dispatch } from '@reduxjs/toolkit';

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
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === GeneralOperationsTypeEnum.ORDER_MODES) {
				state.orderModes.loading = false;
				response && (state.orderModes.content = response);
			}
		},
		failure: (state, action) => {
			const { module } = action.payload;
			if (module === GeneralOperationsTypeEnum.ORDER_MODES) {
				state.orderModes.loading = false;
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
