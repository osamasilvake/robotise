import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import RobotsService from '../../../screens/business/robots/Robots.service';
import { AppConfigService, StorageService } from '../../../services';
import { AppReducerType } from '../..';
import { deserializeRobotTwinsSummary } from './RobotTwinsSummary.slice.deserialize';
import {
	RTSContentInterface,
	RTSContentStateInterface,
	SliceRobotTwinsSummaryInterface
} from './RobotTwinsSummary.slice.interface';
import { mapRobotsAlertsCount } from './RobotTwinsSummary.slice.map';

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
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, updating, updated, reset } = dataSlice.actions;

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
		if (robotTwinsSummary && (robotTwinsSummary.loader || robotTwinsSummary.loading)) {
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

					// map robots alerts count
					const alerts = mapRobotsAlertsCount(result);

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
					id: 'rts-fetch-error',
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
