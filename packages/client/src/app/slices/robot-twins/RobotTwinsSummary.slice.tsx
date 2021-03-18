import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import SitesService from '../../screens/business/sites/Sites.service';
import {
	deserializeRobotTwinsSummary,
	deserializeSites
} from '../../utilities/serializers/json-api/JsonApi';
import { SitesSliceResponseInterface } from '../sites/Sites.slice.interface';
import { RootStateInterface } from '../Slices.interface';
import { RTSSContentInterface, RTSSInterface } from './RobotTwinsSummary.slice.interface';

// initial state
export const initialState: RTSSInterface = {
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Robot Twins Summary',
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
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const robotTwinsSummarySelector = (state: RootStateInterface) => state['robotTwinsSummary'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot twins summary
 * @param pageNo
 * @param rowsPerPage
 * @returns
 */
export const RobotTwinsSummaryFetchList = (pageNo: number, rowsPerPage: number) => async (
	dispatch: Dispatch
) => {
	// dispatch: loader
	dispatch(loading());

	// fetch robot twins summary
	Promise.all([
		SitesService.sitesFetch(),
		RobotsService.robotTwinsSummaryFetch(pageNo, rowsPerPage)
	])
		.then(async (res) => {
			// deserialize responses
			const sites = await deserializeSites(res[0]);
			const robotTwinsSummary = await deserializeRobotTwinsSummary(res[1]);

			// map robots data
			const result: RTSSContentInterface = robotsMapping(sites, robotTwinsSummary);

			// count alerts for badge
			const alerts = countAlerts(result);

			// dispatch: success
			dispatch(success({ ...result, alerts, meta: { ...result.meta, rowsPerPage } }));
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
 * refresh robot twins summary
 * @param sites
 * @returns
 */
export const RobotTwinsSummaryRefreshList = (sites: SitesSliceResponseInterface | null) => async (
	dispatch: Dispatch
) => {
	(sites === null
		? Promise.all([SitesService.sitesFetch(), RobotsService.robotTwinsSummaryFetch()])
		: RobotsService.robotTwinsSummaryFetch()
	)
		.then(async (res) => {
			// deserialize responses
			const sitesRes = sites === null ? await deserializeSites(res[0]) : sites;
			const robotTwinsSummary = await deserializeRobotTwinsSummary(
				sites === null ? res[1] : res
			);

			// map robots data
			const result: RTSSContentInterface = robotsMapping(sitesRes, robotTwinsSummary);

			// count alerts for badge
			const alerts = countAlerts(result);

			// dispatch: success
			dispatch(success({ ...result, alerts }));
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
 * @param robotTwinsSummary
 * @returns
 */
const robotsMapping = (
	sites: SitesSliceResponseInterface,
	robotTwinsSummary: RTSSContentInterface
): RTSSContentInterface => {
	return {
		data: Object.keys(robotTwinsSummary.dataById).map((key) => {
			const robotTwinSummary = robotTwinsSummary.dataById[key];
			const site = sites.dataById[robotTwinSummary.site.id];
			const allAlerts = robotTwinSummary.alerts.value;
			const danger = allAlerts.filter((f) => f.level === 'danger');
			const warn = allAlerts.filter((f) => f.level === 'warning');
			return {
				id: robotTwinSummary.robot.id,
				name: robotTwinSummary.robot.name,
				siteId: site.id,
				siteTitle: site.title,
				isReady: robotTwinSummary.robotState.isReady.value,
				updatedAt: robotTwinSummary.updatedAt,
				alerts: {
					danger: danger.length,
					warning: warn.length
				}
			};
		}),
		dataById: robotTwinsSummary.dataById,
		meta: robotTwinsSummary.meta,
		backup: {
			sites
		}
	};
};

/**
 * count alerts
 * @param payload
 * @returns
 */
const countAlerts = (payload: RTSSContentInterface) => {
	return Object.keys(payload.dataById).reduce(
		(acc, key) => {
			const robotTwin = payload.dataById[key];
			const allAlerts = robotTwin.alerts.value;
			if (allAlerts.length) {
				const danger = allAlerts.filter((f) => f.level === 'danger');
				const warn = allAlerts.filter((f) => f.level === 'warning');
				acc.danger = acc.danger += danger.length;
				acc.warning = acc.warning += warn.length;
			}
			return acc;
		},
		{ danger: 0, warning: 0 }
	);
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
