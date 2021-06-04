import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializeRobotTwinsSummary } from '../../utilities/serializers/json-api/RobotTwinsSummary.deserialize';
import { AppReducerType } from '..';
import { SSContentInterface } from '../sites/Sites.slice.interface';
import { RobotTwinsSummaryTypeEnum } from './RobotTwinsSummary.enum';
import {
	RTSContentInterface,
	SliceRobotTwinsSummaryInterface
} from './RobotTwinsSummary.slice.interface';

// initial state
export const initialState: SliceRobotTwinsSummaryInterface = {
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
export const robotTwinsSummarySelector = (state: AppReducerType) => state['robotTwinsSummary'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot twins summary
 * @param refresh
 * @returns
 */
export const RobotTwinsSummaryFetchList =
	(refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const sites = states.sites;
		const robotTwinsSummary = states.robotTwinsSummary;

		// return on busy
		if (robotTwinsSummary && (robotTwinsSummary.loader || robotTwinsSummary.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return RobotsService.robotTwinsSummaryFetch()
			.then(async (res) => {
				// deserialize response
				const robotTwinsSummary = await deserializeRobotTwinsSummary(res);

				if (sites && sites.content) {
					// prepare robot twins summary content
					const result = prepareContent(sites.content, robotTwinsSummary);

					// count alerts for badge
					const alerts = countAlerts(result);

					// dispatch: success
					dispatch(success({ ...result, alerts }));
				}
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'fetch-rts-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
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
	robotTwinsSummary: RTSContentInterface
): RTSContentInterface => {
	return {
		data: Object.keys(robotTwinsSummary.dataById).map((key) => {
			const robotTwinSummary = robotTwinsSummary.dataById[key];
			const site = sites.dataById[robotTwinSummary.site.id];
			const alerts = robotTwinSummary.alerts.value;
			const danger = alerts.filter((f) => f.level === RobotTwinsSummaryTypeEnum.DANGER);
			const warn = alerts.filter((f) => f.level === RobotTwinsSummaryTypeEnum.WARNING);
			return {
				id: robotTwinSummary.id,
				robotId: robotTwinSummary.robot.id,
				robotTitle: robotTwinSummary.robot.name,
				isReady: robotTwinSummary.robotState.isReady.value,
				updatedAt: robotTwinSummary.updatedAt,
				siteId: site.id,
				siteTitle: site.title,
				siteCurrency: site.currency,
				acceptOrders: site.acceptOrders,
				alerts: {
					danger: danger.length,
					warning: warn.length
				}
			};
		}),
		dataById: robotTwinsSummary.dataById
	};
};

/**
 * count alerts
 * @param payload
 * @returns
 */
const countAlerts = (payload: RTSContentInterface) => {
	return Object.keys(payload.dataById).reduce(
		(acc, key) => {
			const robotTwins = payload.dataById[key];
			const alerts = robotTwins.alerts.value;
			if (alerts.length) {
				const danger = alerts.filter((f) => f.level === RobotTwinsSummaryTypeEnum.DANGER);
				const warn = alerts.filter((f) => f.level === RobotTwinsSummaryTypeEnum.WARNING);
				acc.danger = acc.danger += danger.length;
				acc.warning = acc.warning += warn.length;
				acc.count = acc.count += 1;
			}
			return acc;
		},
		{ count: 0, danger: 0, warning: 0 }
	);
};
