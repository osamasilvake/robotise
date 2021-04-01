import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializeRobot } from '../../utilities/serializers/json-api/Robot.deserialize';
import { AppReducerType } from '..';
import { RobotTypeEnum } from './Robot.slice.enum';
import { RSInterface } from './Robot.slice.interface';

// initial state
export const initialState: RSInterface = {
	map: {
		loading: false,
		content: null,
		errors: null
	}
};

// slice
const dataSlice = createSlice({
	name: 'Robot',
	initialState,
	reducers: {
		loading: (state, action) => {
			const { module } = action.payload;
			if (module === RobotTypeEnum.MAP) {
				state.map.loading = true;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === RobotTypeEnum.MAP) {
				state.map.loading = false;
				state.map.content = response;
				state.map.errors = null;
			}
		},
		failure: (state, action) => {
			const { module, response } = action.payload;
			if (module === RobotTypeEnum.MAP) {
				state.map.loading = false;
				state.map.content = null;
				state.map.errors = response;
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const robotSelector = (state: AppReducerType) => state['robot'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot map of location
 * @param mapId
 * @returns
 */
export const RobotLocationMapFetch = (mapId: string) => async (dispatch: Dispatch) => {
	const state = {
		module: RobotTypeEnum.MAP,
		type: null
	};

	// dispatch: loader
	dispatch(loading(state));

	return RobotsService.robotLocationMapFetch(mapId)
		.then(async (res) => {
			// deserialize response
			const result = await deserializeRobot(res);

			// dispatch: success
			dispatch(success({ ...state, response: result }));
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				id: 'fetch-rt-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.FETCH'
			};

			// dispatch: error
			dispatch(failure(message));

			// dispatch: error
			dispatch(failure({ ...state, response: 'Error: MAP' }));
		});
};
