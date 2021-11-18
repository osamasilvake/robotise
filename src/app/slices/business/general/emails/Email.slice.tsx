import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import GeneralService from '../../../../screens/business/general/General.service';
import { AppReducerType } from '../../..';
import { deserializeEmail } from './Email.deserialize';
import { SliceEmailInterface } from './Email.slice.interface';

// initial state
export const initialState: SliceEmailInterface = {
	loader: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Email',
	initialState,
	reducers: {
		loader: (state) => {
			state.loader = true;
		},
		success: (state, action) => {
			state.loader = false;
			state.content = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.loader = false;
			state.content = null;
			state.errors = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, success, failure, reset } = dataSlice.actions;

// selector
export const emailSelector = (state: AppReducerType) => state['email'];

// reducer
export default dataSlice.reducer;

/**
 * fetch email
 * @param emailId
 * @returns
 */
export const EmailFetch =
	(emailId: string) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const email = states.email;

		// return on busy
		if (email && email.loader) {
			return;
		}

		// dispatch: loader
		dispatch(loader());

		return GeneralService.generalEmailFetch(emailId)
			.then(async (res) => {
				// deserialize response
				const result = await deserializeEmail(res);

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'email-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
