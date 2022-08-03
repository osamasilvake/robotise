import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';
import RobotsService from '../../../../../screens/business/robots/Robots.service';
import { RootState } from '../../../..';
import { deserializeRobotConfiguration } from './RobotConfiguration.slice.deserialize';
import {
	RCContentInterface,
	SliceRobotConfigurationInterface
} from './RobotConfiguration.slice.interface';

// initial state
export const initialState: SliceRobotConfigurationInterface = {
	init: false,
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Robot Configuration',
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
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, reset } = dataSlice.actions;

// selector
export const robotConfigurationSelector = (state: RootState) => state['robotConfiguration'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot configuration
 * @param robotId
 * @param refresh
 * @returns
 */
export const RobotConfigurationFetch =
	(robotId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const robotConfiguration = states.robotConfiguration;

		// return on busy
		if (robotConfiguration && (robotConfiguration.loader || robotConfiguration.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch robot configuration
		return RobotsService.robotConfigurationFetch(robotId)
			.then(async (res) => {
				// deserialize response
				const result: RCContentInterface = await deserializeRobotConfiguration(res);

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-configuration-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
