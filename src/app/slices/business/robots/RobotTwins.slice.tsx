import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import RobotsService from '../../../screens/business/robots/Robots.service';
import { AppReducerType } from '../..';
import { deserializeRobotTwins } from './RobotTwins.slice.deserialize';
import { SliceRobotTwinsInterface } from './RobotTwins.slice.interface';
import { mapRobotTwins } from './RobotTwins.slice.map';

// initial state
export const initialState: SliceRobotTwinsInterface = {
	init: false,
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Robot Twins',
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
export const robotTwinsSelector = (state: AppReducerType) => state['robotTwins'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot twins of a robot
 * @param robotTwinId
 * @param refresh
 * @returns
 */
export const RobotTwinsFetch =
	(robotTwinId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const sites = states.sites;
		const robotTwins = states.robotTwins;

		// return on busy
		if (robotTwins && (robotTwins.loader || robotTwins.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return RobotsService.robotTwinFetch(robotTwinId)
			.then(async (res) => {
				// deserialize response
				const robotTwins = await deserializeRobotTwins(res);

				// prepare robot twins content
				// map robot twins
				const result = mapRobotTwins(sites.content, robotTwins);

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'rb-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
