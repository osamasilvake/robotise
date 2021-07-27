import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { AppConfigService, StorageService } from '../../services';
import { deserializeRobotTwinsSummary } from '../../utilities/serializers/json-api/RobotTwinsSummary.deserialize';
import { AppReducerType } from '..';
import {
	RTSContentInterface,
	RTSContentStateInterface,
	SliceRobotTwinsSummaryInterface
} from './RobotTwinsSummary.slice.interface';

// storage item
const robotsState = StorageService.get(AppConfigService.StorageItems.RobotsState);

// initial state
export const initialState: SliceRobotTwinsSummaryInterface = {
	loader: false,
	loading: false,
	updating: false,
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
		updating: (state) => {
			state.updating = true;
		},
		updated: (state, action) => {
			state.updating = false;
			state.content = action.payload;
		},
		updateFailed: (state) => {
			state.updating = false;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, updating, updated, updateFailed, reset } =
	dataSlice.actions;

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
		const filters = robotTwinsSummary.content?.state || robotsState;

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

		return RobotsService.robotTwinsSummaryFetch(filters)
			.then(async (res) => {
				if (sites && sites.content) {
					// deserialize response
					let result: RTSContentInterface = await deserializeRobotTwinsSummary(
						res,
						sites.content
					);

					// count alerts for badge
					const alerts = countAlerts(result);

					// state
					result = {
						...result,
						alerts,
						state: filters
					};

					// dispatch: success
					dispatch(success(result));
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
 * update state
 * @param state
 * @returns
 */
export const RobotTwinsSummaryUpdateState =
	(state: RTSContentStateInterface) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const robotTwinsSummary = states.robotTwinsSummary;

		// dispatch: updating
		dispatch(updating());

		if (robotTwinsSummary && robotTwinsSummary.content) {
			const result = {
				...robotTwinsSummary.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));

			// storage: robots state
			StorageService.put(AppConfigService.StorageItems.RobotsState, state);
		}
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
				acc.count = acc.count += alerts.danger ? 1 : 0;
			}
			return acc;
		},
		{ count: 0, danger: 0, warning: 0 }
	);
};
