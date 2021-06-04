import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { timeout } from '../../utilities/methods/Timeout';
import { deserializeRobotTwins } from '../../utilities/serializers/json-api/RobotTwins.deserialize';
import { AppReducerType } from '..';
import { SSContentInterface } from '../sites/Sites.slice.interface';
import { SliceRobotTwinsInterface, SRTContentDataInterface } from './RobotTwins.slice.interface';

// initial state
export const initialState: SliceRobotTwinsInterface = {
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
 * @param wait
 * @returns
 */
export const RobotTwinsFetch =
	(robotTwinId: string, refresh = false, wait = -1) =>
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

		// wait
		wait >= 0 && (await timeout(wait));

		return RobotsService.robotTwinFetch(robotTwinId)
			.then(async (res) => {
				// deserialize response
				const robotTwins = await deserializeRobotTwins(res);

				// prepare robot twins content
				if (sites && sites.content) {
					// prepare robot twins content
					const result = prepareContent(sites.content, robotTwins);

					// dispatch: success
					dispatch(success(result));
				}
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'fetch-rb-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * prepare robot twins content
 * @param sites
 * @param robotTwins
 * @returns
 */
const prepareContent = (
	sites: SSContentInterface,
	robotTwins: SRTContentDataInterface
): SRTContentDataInterface => {
	const site = sites.dataById[robotTwins.site.id];
	return {
		...robotTwins,
		id: robotTwins.id,
		robot: {
			id: robotTwins.robot.id,
			name: robotTwins.robot.name
		},
		site: {
			...robotTwins.site,
			title: site.title,
			acceptOrders: site.acceptOrders,
			elevator: site.elevators
		}
	};
};
