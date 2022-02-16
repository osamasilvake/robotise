import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { DialogCreateRobotFormInterface } from '../../../screens/business/robots/list/actions/RobotsActions.interface';
import RobotsService from '../../../screens/business/robots/Robots.service';
import { AppConfigService, StorageService } from '../../../services';
import { timeout } from '../../../utilities/methods/Timeout';
import { AppReducerType } from '../..';
import { triggerMessage } from '../../general/General.slice';
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
	init: false,
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
			state.init = true;
			state.loader = false;
			state.loading = false;
			state.content = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.init = true;
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
			if (action.payload) {
				state.content = action.payload;
			}
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
		const robotTwinsSummary = states.robotTwinsSummary;
		const state = robotTwinsSummary.content?.state || robotsState;

		// return on busy
		if (robotTwinsSummary && (robotTwinsSummary.loader || robotTwinsSummary.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return RobotsService.robotTwinsSummaryFetch(state)
			.then(async (res) => {
				// deserialize response
				let result: RTSContentInterface = await deserializeRobotTwinsSummary(res);

				// map robots alerts count
				const alerts = mapRobotsAlertsCount(result);

				// set content
				result = {
					...result,
					alerts,
					state
				};

				// dispatch: success
				dispatch(success(result));
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
 * create a robot
 * @param payload
 * @param callback
 * @returns
 */
export const RobotCreate =
	(payload: DialogCreateRobotFormInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return RobotsService.robotRobotCreate(payload)
			.then(async () => {
				// wait
				await timeout(1000);

				// dispatch: updated
				dispatch(updated(null));

				// callback
				callback();

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'rts-create-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.MAIN.CREATE.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'rts-create-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.MAIN.CREATE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
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
