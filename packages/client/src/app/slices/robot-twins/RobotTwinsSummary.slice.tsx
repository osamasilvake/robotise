import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import SitesService from '../../screens/business/sites/Sites.service';
import {
	deserializeRobots,
	deserializeRobotTwins,
	deserializeSites
} from '../../utilities/serializers/json-api/JsonApi';
import { SitesSliceResponseInterface } from '../sites/Sites.slice.interface';
import { RootStateInterface } from '../Slices.interface';
import { RTSResponseInterface } from './RobotTwins.slice.interface';
import { RTSSContentInterface, RTSSInterface } from './RobotTwinsSummary.slice.interface';

// initial state
export const initialState: RTSSInterface = {
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
			state.content = state.content
				? RobotsOrganizeState(state.content, action.payload)
				: action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.loading = false;
			state.content = null;
			state.errors = action.payload;
		},
		reset: () => initialState,
		updateRobotTwins: (state, action) => {
			if (state.content && state.content.backup && !state.loading) {
				// map robots data
				const result: RTSSContentInterface = robotsMapping(
					state.content.backup.sites,
					action.payload,
					state.content
				);

				// update state
				state.content = result;
			}
		}
	}
});

// actions
export const { loading, success, failure, reset, updateRobotTwins } = dataSlice.actions;

// selector
export const robotsSelector = (state: RootStateInterface) => state['robots'];

// reducer
export default dataSlice.reducer;

/**
 * fetch sites, robot twins and robots and map them to create robots list
 * @param pageNo
 * @param rowsPerPage
 * @returns
 */
export const RobotsFetchList = (pageNo: number, rowsPerPage: number) => async (
	dispatch: Dispatch
) => {
	// dispatch: loader
	dispatch(loading());

	// fetch sites, robot twins and robots and map them to create robots list
	Promise.all([
		SitesService.sitesFetch(),
		RobotsService.robotTwinsFetch(),
		RobotsService.robotsFetch(pageNo, rowsPerPage)
	])
		.then(async (res) => {
			// deserialize responses
			const sites = await deserializeSites(res[0]);
			const robotTwins = await deserializeRobotTwins(res[1]);
			const robots = await deserializeRobots(res[2]);

			// map robots data
			const result: RTSSContentInterface = robotsMapping(sites, robotTwins, robots);

			// dispatch: success
			dispatch(success({ ...result, meta: { ...result.meta, rowsPerPage } }));
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.FETCH'
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
	robotTwins: RTSResponseInterface,
	robots: RTSSContentInterface
): RTSSContentInterface => {
	return {
		data: Object.keys(robots.dataById).map((key) => {
			const robot = robots.dataById[key];
			const site = sites.dataById[robot.site.id];
			const robotTwin = robotTwins.dataById[robot.id];
			const allAlerts = robotTwin.alerts.value;
			const danger = allAlerts.filter((f) => f.level === 'danger');
			const warn = allAlerts.filter((f) => f.level === 'warning');
			return {
				id: robot.id,
				name: robot.name,
				siteId: site.id,
				siteTitle: site.title,
				isReady: robotTwin.robotState.isReady.value,
				updatedAt: robotTwin.updatedAt,
				alerts: {
					danger: danger.length,
					warning: warn.length
				}
			};
		}),
		dataById: robots.dataById,
		meta: robots.meta,
		backup: {
			sites
		}
	};
};

/**
 * organize robots state to handle pagination
 * @param state
 * @param action
 * @returns
 */
const RobotsOrganizeState = (state: RTSSContentInterface, action: RTSSContentInterface) => {
	const condition1 = action.meta.page > 1; // first page
	const condition2 = action.meta.nextPage > state.meta.nextPage; // between pages
	const condition3 = action.meta.nextPage === null; // last page
	if (condition1 && (condition2 || condition3)) {
		action.meta.nextPage = condition3 ? state.meta.nextPage + 1 : action.meta.nextPage;
		return {
			...state,
			meta: {
				...state.meta,
				...action.meta
			},
			data: [...state.data, ...action.data],
			dataById: {
				...state.dataById,
				...action.dataById
			}
		};
	}
	return action;
};
