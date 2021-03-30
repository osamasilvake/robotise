import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import SitesService from '../../screens/business/sites/Sites.service';
import { timeout } from '../../utilities/methods/Timeout';
import { deserializeRobotTwins } from '../../utilities/serializers/json-api/RobotTwins.deserialize';
import { deserializeSites } from '../../utilities/serializers/json-api/Sites.deserialize';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
import { success as sitesSuccess } from '../sites/Sites.slice';
import { SSContentInterface } from '../sites/Sites.slice.interface';
import { RTSContentInterface, RTSInterface } from './RobotTwins.slice.interface';

// initial state
export const initialState: RTSInterface = {
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
 * fetch robot twins of single robot
 * @param robotId
 * @param refresh
 * @param wait
 * @returns
 */
export const RobotTwinsSingleRobotFetchList = (
	robotId: string,
	refresh = false,
	wait = false
) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
	// redux state
	const state = getState();

	// state
	const sites = state.sites;

	// dispatch: loader/loading
	dispatch(!refresh ? loader() : loading());

	// waiting
	if (wait) {
		// timeout: 8 secs
		await timeout(8000);
	}

	return (!sites.content
		? Promise.all([
				SitesService.sitesFetch(),
				RobotsService.robotTwinsSingleRobotFetch(robotId)
		  ])
		: RobotsService.robotTwinsSingleRobotFetch(robotId)
	)
		.then(async (res) => {
			// deserialize responses
			const sitesRes = !sites.content ? await deserializeSites(res[0]) : sites.content;
			const robotTwins = await deserializeRobotTwins(!sites.content ? res[1] : res);

			// prepare robot twins content
			const result: RTSContentInterface = prepareContent(sitesRes, robotTwins);

			// dispatch: success
			dispatch(success(result));

			// dispatch: success (sites)
			if (!sites.content) {
				dispatch(sitesSuccess(sitesRes));
			}
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.FETCH'
			};

			// dispatch: error
			dispatch(failure(message));

			// dispatch: trigger message
			dispatch(triggerMessage(message));
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
	robotTwins: RTSContentInterface
): RTSContentInterface => {
	return {
		data: Object.keys(robotTwins.dataById).map((key) => {
			const robotTwinsRes = robotTwins.dataById[key];
			const site = sites.dataById[robotTwinsRes.site.id];
			return {
				...robotTwinsRes,
				id: robotTwinsRes.id,
				robot: {
					id: robotTwinsRes.robot.id,
					name: robotTwinsRes.robot.name
				},
				site: {
					...robotTwinsRes.site,
					title: site.title,
					acceptOrders: site.acceptOrders,
					elevator: site.elevators
				}
			};
		}),
		dataById: robotTwins.dataById
	};
};
