import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import SitesService from '../../screens/business/sites/Sites.service';
import {
	deserializeRobotTwins,
	deserializeSites
} from '../../utilities/serializers/json-api/JsonApi';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
import { SSContentInterface } from '../sites/Sites.slice.interface';
import { RTSContentInterface, RTSInterface } from './RobotTwins.slice.interface';

// initial state
export const initialState: RTSInterface = {
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Robot Twins',
	initialState,
	reducers: {
		loading: (state) => {
			state.loading = true;
		},
		success: (state, action) => {
			state.loading = false;
			state.content = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.loading = false;
			state.content = null;
			state.errors = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const robotTwinsSelector = (state: AppReducerType) => state['robotTwins'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot twins of single robot
 * @param robotId
 * @returns
 */
export const RobotTwinsSingleRobotFetchList = (robotId: string) => async (
	dispatch: Dispatch,
	getState: () => AppReducerType
) => {
	// redux state
	const state = getState();

	// state
	const sites = state.sites;
	const robotTwins = state.robotTwins;

	// return on busy
	if (robotTwins && robotTwins.loading) {
		return;
	}

	// dispatch: loader
	dispatch(loading());

	(!sites.content
		? Promise.all([
				SitesService.sitesFetch(),
				RobotsService.robotTwinsSingleRobotFetch(robotId)
		  ])
		: RobotsService.robotTwinsSingleRobotFetch(robotId)
	)
		.then(async (res) => {
			// deserialize responses
			const sitesRes = !sites.content ? await deserializeSites(res[0]) : sites.content;
			const robotTwins = await deserializeRobotTwins(res[1]);

			// prepare robot twins content
			const result: RTSContentInterface = prepareContent(sitesRes, robotTwins);

			// dispatch: success
			dispatch(success(result));
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.FETCH'
			};

			// dispatch: trigger message
			dispatch(triggerMessage(message));

			// dispatch: error
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
	robotTwins: RTSContentInterface
): RTSContentInterface => {
	return {
		data: Object.keys(robotTwins.dataById).map((key) => {
			const robotTwinsRes = robotTwins.dataById[key];
			const site = sites.dataById[robotTwinsRes.site.id];
			return {
				...robotTwinsRes,
				id: robotTwinsRes.robot.id,
				site: {
					...robotTwinsRes.site,
					title: site.title,
					elevator: site.elevators
				}
			};
		}),
		dataById: robotTwins.dataById
	};
};
