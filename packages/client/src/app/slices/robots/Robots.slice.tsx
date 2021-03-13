import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import SitesService from '../../screens/business/sites/Sites.service';
import { get } from '../../utilities/methods/ObjectUtilities';
import {
	deserializeRobots,
	deserializeRobotTwins,
	deserializeSites
} from '../../utilities/serializers/json-api/JsonApi';
import { RobotTwinsSliceResponseInterface } from '../robot-twins/RobotTwins.slice.interface';
import { SitesSliceResponseInterface } from '../sites/Sites.slice.interface';
import { RootStateInterface } from '../Slices.interface';
import {
	RobotsSliceInterface,
	RobotsSliceResponseAllInterface,
	RobotsSliceResponseInterface
} from './Robots.slice.interface';

// initial state
export const initialState: RobotsSliceInterface = {
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Robots',
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
export const robotsSelector = (state: RootStateInterface) => state['robots'];

// reducer
export default dataSlice.reducer;

/**
 * fetch sites, robot twins and robots and map them to create robots list
 */
export const RobotsFetchList = () => async (dispatch: Dispatch) => {
	// dispatch: loader
	dispatch(loading());

	// fetch sites, robot twins and robots and map them to create robots list
	Promise.all([
		SitesService.sitesFetch(),
		RobotsService.robotTwinsFetch(),
		RobotsService.robotsFetch()
	])
		.then(async (res) => {
			// deserialize responses
			const sites = await deserializeSites(res[0]);
			const robotTwins = await deserializeRobotTwins(res[1]);
			const robots = await deserializeRobots(res[2]);

			// map robots data
			const result: RobotsSliceResponseAllInterface[] = robotsMapping(
				sites,
				robotTwins,
				robots
			);

			// dispatch: success
			dispatch(success(result));
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'MAIN.COMMON.ERRORS.FETCH_ERROR'
			};

			// dispatch: error
			dispatch(failure(message));
		});
};

/**
 * map robots data
 * @param sites
 * @param robotTwins
 * @param robots
 * @returns
 */
const robotsMapping = (
	sites: SitesSliceResponseInterface,
	robotTwins: RobotTwinsSliceResponseInterface,
	robots: RobotsSliceResponseInterface
): RobotsSliceResponseAllInterface[] => {
	return Object.keys(robots.dataById).map((key) => {
		const robot = robots.dataById[key];
		const site = sites.dataById[robot.site.id];
		const robotTwin = robotTwins.dataById[robot.id];
		const allAlerts = get(robotTwin, 'alerts.value', []);
		return {
			id: robot.id,
			name: robot.name,
			siteId: get(site, 'id', 'MAIN.COMMON.UNKNOWN'),
			siteTitle: get(site, 'title', 'MAIN.COMMON.UNKNOWN'),
			isReady: get(robotTwin, 'robotState.isReady.value'),
			updatedAt: get(robotTwin, 'updatedAt'),
			alerts: {
				danger: allAlerts.filter((f: { level: string }) => f.level === 'danger').length,
				warning: allAlerts.filter((f: { level: string }) => f.level === 'warning').length
			}
		};
	});
};
