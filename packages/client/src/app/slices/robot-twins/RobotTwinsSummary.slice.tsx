import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import SitesService from '../../screens/business/sites/Sites.service';
import { AppConfigService } from '../../services';
import { deserializeRobotTwinsSummary } from '../../utilities/serializers/json-api/RobotTwinsSummary.deserialize';
import { deserializeSites } from '../../utilities/serializers/json-api/Sites.deserialize';
import { AppReducerType } from '..';
import { success as sitesSuccess } from '../sites/Sites.slice';
import { SSContentInterface } from '../sites/Sites.slice.interface';
import { RobotTwinsSummaryTypeEnum } from './RobotTwinsSummary.enum';
import { RTSSContentInterface, RTSSInterface } from './RobotTwinsSummary.slice.interface';

// initial state
export const initialState: RTSSInterface = {
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Robot Twins Summary',
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
			state.content = state.content
				? handlePaginationState(state.content, action.payload)
				: action.payload;
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
export const robotTwinsSummarySelector = (state: AppReducerType) => state['robotTwinsSummary'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot twins summary
 * @param pageNo
 * @param rowsPerPage
 * @param refresh
 * @returns
 */
export const RobotTwinsSummaryFetchList = (
	pageNo: number,
	rowsPerPage: number,
	refresh = false
) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
	// redux state
	const state = getState();

	// state
	const sites = state.sites;
	const robotTwinsSummary = state.robotTwinsSummary;

	// return on busy
	if (robotTwinsSummary.loader || robotTwinsSummary.loading) {
		return;
	}

	// dispatch: loader/loading
	dispatch(!refresh ? loader() : loading());

	// meta: paging
	const sPageNo = pageNo === -1 ? state.robotTwinsSummary.content?.meta.page || 1 : pageNo;
	const sRowsPerPage =
		rowsPerPage === -1
			? state.robotTwinsSummary.content?.meta.rowsPerPage ||
			  AppConfigService.AppOptions.screens.robots.list.defaultPageSize
			: rowsPerPage;

	return (!sites.content
		? Promise.all([
				SitesService.sitesFetch(),
				RobotsService.robotTwinsSummaryFetch(sPageNo, sRowsPerPage)
		  ])
		: RobotsService.robotTwinsSummaryFetch(sPageNo, sRowsPerPage)
	)
		.then(async (res) => {
			// deserialize responses
			const sitesRes = !sites.content ? await deserializeSites(res[0]) : sites.content;
			const robotTwinsSummary = await deserializeRobotTwinsSummary(
				!sites.content ? res[1] : res
			);

			// prepare robot twins summary content
			const result: RTSSContentInterface = prepareContent(sitesRes, robotTwinsSummary);

			// count alerts for badge
			const alerts = countAlerts(result);

			// dispatch: success
			dispatch(
				success({ ...result, alerts, meta: { ...result.meta, rowsPerPage: sRowsPerPage } })
			);

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
			const danger = allAlerts.filter((f) => f.level === RobotTwinsSummaryTypeEnum.DANGER);
			const warn = allAlerts.filter((f) => f.level === RobotTwinsSummaryTypeEnum.WARNING);
			return {
				id: robotTwinSummary.id,
				robotId: robotTwinSummary.robot.id,
				robotTitle: robotTwinSummary.robot.name,
				isReady: robotTwinSummary.robotState.isReady.value,
				updatedAt: robotTwinSummary.updatedAt,
				siteId: site.id,
				siteTitle: site.title,
				acceptOrders: site.acceptOrders,
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
				const danger = allAlerts.filter(
					(f) => f.level === RobotTwinsSummaryTypeEnum.DANGER
				);
				const warn = allAlerts.filter((f) => f.level === RobotTwinsSummaryTypeEnum.WARNING);
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
