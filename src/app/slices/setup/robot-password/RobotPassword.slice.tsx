import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import SetupService from '../../../screens/settings/setup/Setup.service';
import { RootState } from '../..';
import { triggerMessage } from '../../app/App.slice';
import { SliceRobotPasswordInterface } from './RobotPassword.interface';

// initial state
export const initialState: SliceRobotPasswordInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Robot Password',
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
			if (action.payload) {
				state.content = action.payload;
			}
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
export const robotPasswordSelector = (state: RootState) => state['robotPassword'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot password
 * @param refresh
 * @returns
 */
export const RobotPasswordFetch =
	(refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const robotPassword = states.robotPassword;

		// return on busy
		if (robotPassword && (robotPassword.loader || robotPassword.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch
		return SetupService.setupRobotPassword()
			.then(async (res) => {
				// dispatch: success
				dispatch(success(res));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-password-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * update robot password
 * @param password
 * @returns
 */
export const RobotPasswordUpdate = (password: string) => async (dispatch: Dispatch) => {
	// dispatch: updating
	dispatch(updating());

	return SetupService.setupUpdatePassword(password)
		.then(async () => {
			// dispatch: updated
			dispatch(updated(null));

			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'robot-password-update-success',
				show: true,
				severity: TriggerMessageTypeEnum.SUCCESS,
				text: 'SETUP.ROBOT_PASSWORD.EDIT.SUCCESS'
			};
			dispatch(triggerMessage(message));
		})
		.catch(() => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'robot-password-update-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'SETUP.ROBOT_PASSWORD.EDIT.ERROR'
			};
			dispatch(triggerMessage(message));

			// dispatch: update failed
			dispatch(updateFailed());
		});
};
