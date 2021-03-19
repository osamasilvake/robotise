import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import SitesService from '../../screens/business/sites/Sites.service';
import { AppConfigService } from '../../services';
import {
	deserializeRobotTwinsSummary,
	deserializeSites
} from '../../utilities/serializers/json-api/JsonApi';
import { appReducerType } from '..';
import { success as sitesSuccess } from '../sites/Sites.slice';
import { SSContentInterface } from '../sites/Sites.slice.interface';
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
				? handlePaginationState(state.content, action.payload)
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
export const robotTwinsSummarySelector = (state: appReducerType) => state['robotTwinsSummary'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot twins summary
 * @param pageNo
 * @param rowsPerPage
 * @returns
 */
export const RobotTwinsSummaryFetchList = (pageNo: number, rowsPerPage: number) => async (
	dispatch: Dispatch,
	getState: () => appReducerType
) => {
	// redux state
	const state = getState();

	// states
	const sites = state.sites;
	const robotTwinsSummary = state.robotTwinsSummary;

	// return on busy
	if (robotTwinsSummary.loading) {
		return;
	}

	// dispatch: loader
	dispatch(loading());

	Promise.all([
		SitesService.sitesFetch(),
		RobotsService.robotTwinsSummaryFetch(pageNo, rowsPerPage)
	])
		.then(async (res) => {
			// deserialize responses
			const sitesRes = sites.content ? sites.content : await deserializeSites(res[0]);
			const robotTwinsSummary = await deserializeRobotTwinsSummary(res[1]);

			// prepare robot twins summary content
			const result: RTSSContentInterface = prepareContent(sitesRes, robotTwinsSummary);

			// count alerts for badge
			const alerts = countAlerts(result);

			// dispatch: success
			dispatch(success({ ...result, alerts, meta: { ...result.meta, rowsPerPage } }));

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
		});
};

/**
 * refresh robot twins summary
 * @returns
 */
export const RobotTwinsSummaryRefreshList = () => async (
	dispatch: Dispatch,
	getState: () => appReducerType
) => {
	// redux state
	const state = getState();

	// states
	const sites = state.sites;
	const robotTwinsSummary = state.robotTwinsSummary;

	// return on busy
	if (robotTwinsSummary.loading) {
		return;
	}

	// meta
	const pageNo = state.robotTwinsSummary.content?.meta.page || 1;
	const rowsPerPage =
		state.robotTwinsSummary.content?.meta.rowsPerPage ||
		AppConfigService.AppOptions.screens.robots.defaultPageSize;

	(!sites.content
		? Promise.all([
				SitesService.sitesFetch(),
				RobotsService.robotTwinsSummaryFetch(pageNo, rowsPerPage)
		  ])
		: RobotsService.robotTwinsSummaryFetch(pageNo, pageNo * rowsPerPage)
	)
		.then(async (res) => {
			// deserialize responses
			const sitesRes = sites.content ? sites.content : await deserializeSites(res[0]);
			const robotTwinsSummary = await deserializeRobotTwinsSummary(
				sites === null ? res[1] : res
			);

			// prepare robot twins summary content
			const result: RTSSContentInterface = prepareContent(sitesRes, robotTwinsSummary);

			// count alerts for badge
			const alerts = countAlerts(result);

			// dispatch: success
			dispatch(success({ ...result, alerts }));

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
		});
};

/**
 * prepare robot twins summary content
 * @param sites
 * @param robotTwinsSummary
 * @returns
 */
const prepareContent = (
	sites: SSContentInterface,
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
		meta: robotTwinsSummary.meta
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
const handlePaginationState = (state: RTSSContentInterface, action: RTSSContentInterface) => {
	const condition1 = action.meta.page > 1; // first page
	const condition2 = action.meta.nextPage > state.meta.nextPage; // between pages
	const condition3 = action.meta.nextPage === null; // last page
	if (condition1 && (condition2 || condition3)) {
		action.meta.nextPage = condition3 ? state.meta.page + 1 : action.meta.nextPage;
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
