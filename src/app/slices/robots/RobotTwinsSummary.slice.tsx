import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializeRobotTwinsSummary } from '../../utilities/serializers/json-api/RobotTwinsSummary.deserialize';
import { AppReducerType } from '..';
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
		if (
			robotTwinsSummary &&
			sites &&
			(robotTwinsSummary.loader || robotTwinsSummary.loading || sites.loader)
		) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return RobotsService.robotTwinsSummaryFetch()
			.then(async (res) => {
				if (sites && sites.content) {
					// deserialize response
					const result = await deserializeRobotTwinsSummary(res, sites.content);

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
 * count alerts
 * @param payload
 * @returns
 */
const countAlerts = (payload: RTSContentInterface) => {
	return Object.keys(payload.dataById).reduce(
		(acc, key) => {
			const robotTwins = payload.dataById[key];
			const alerts = robotTwins.alerts;
			if (alerts) {
				acc.danger = acc.danger += alerts.danger;
				acc.warning = acc.warning += alerts.warning;
				acc.count = acc.count += 1;
			}
			return acc;
		},
		{ count: 0, danger: 0, warning: 0 }
	);
};
