import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';
import RobotsService from '../../../../../screens/business/robots/Robots.service';
import { timeout } from '../../../../../utilities/methods/Timeout';
import { RootState } from '../../../..';
import { triggerMessage } from '../../../../app/App.slice';
import { deserializeRobotConfiguration } from './RobotConfiguration.slice.deserialize';
import {
	RCCDataElementInterface,
	SliceRobotConfigurationInterface
} from './RobotConfiguration.slice.interface';

// initial state
export const initialState: SliceRobotConfigurationInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
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
		updating: (state) => {
			state.updating = true;
		},
		updated: (state) => {
			state.updating = false;
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
				let result = await deserializeRobotConfiguration(res);

				result = {
					data: result,
					pRobotId: robotId
				};

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

/**
 * update robot configuration
 * @param robotId
 * @param configId
 * @param payload
 * @param callback
 * @returns
 */
export const RobotConfigurationUpdate =
	(robotId: string, configId: string, payload: RCCDataElementInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		// update robot configuration
		return RobotsService.robotConfigurationUpdate(robotId, configId, payload)
			.then(async () => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-configuration-update-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.CONFIGURATION.ROBOT_CONFIGURATION.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: updated
				dispatch(updated());

				// wait
				await timeout(1000);

				// callback
				callback();
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-configuration-update-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.CONFIGURATION.ROBOT_CONFIGURATION.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};
