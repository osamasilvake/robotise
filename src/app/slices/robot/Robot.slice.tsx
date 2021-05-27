import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { RobotDetailCameraTypeEnum } from '../../screens/business/robots/content/detail/cameras/RobotDetailCameras.enum';
import {
	RobotDetailCommandsMuteSensorsTypeEnum,
	RobotDetailCommandsTypeEnum,
	RobotDetailControlModeTypeEnum
} from '../../screens/business/robots/content/detail/commands/RobotDetailCommands.enum';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializeRobot } from '../../utilities/serializers/json-api/Robot.deserialize';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
import { RobotTypeEnum } from './Robot.slice.enum';
import { SliceRobotInterface } from './Robot.slice.interface';

// initial state
export const initialState: SliceRobotInterface = {
	map: {
		loading: false,
		content: null,
		errors: null
	},
	control: {
		loading: false,
		content: null
	},
	camera: {
		loading: false,
		content: null
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
				state.map.content = null;
				state.map.errors = null;
			} else if (module === RobotTypeEnum.ROC_CONTROL) {
				state.control.loading = true;
				state.control.content = null;
			} else if (module === RobotTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = true;
				state.camera.content = null;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === RobotTypeEnum.MAP) {
				state.map.loading = false;
				state.map.content = response;
				state.map.errors = null;
			} else if (module === RobotTypeEnum.ROC_CONTROL) {
				state.control.loading = false;
				state.control.content = response;
			} else if (module === RobotTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = false;
				state.camera.content = response;
			}
		},
		failure: (state, action) => {
			const { module, error } = action.payload;
			if (module === RobotTypeEnum.MAP) {
				state.map.loading = false;
				state.map.content = null;
				state.map.errors = error;
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
 * fetch robot map location
 * @param mapId
 * @returns
 */
export const RobotLocationMapFetch = (mapId: string) => async (dispatch: Dispatch) => {
	const state = {
		module: RobotTypeEnum.MAP
	};

	// dispatch: loading
	dispatch(loading(state));

	return RobotsService.robotLocationMapFetch(mapId)
		.then(async (res) => {
			// deserialize response
			const result = await deserializeRobot(res);

			// dispatch: success
			dispatch(success({ ...state, response: result }));
		})
		.catch((err) => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: `fetch-robot-location-error`,
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: `ROBOTS.DETAIL.MAP.ERROR`
			};
			dispatch(triggerMessage(message));

			// dispatch: failure
			dispatch(failure({ ...state, error: err }));
		});
};

/**
 * send robot control command
 * @param robotId
 * @param command
 * @param option
 * @returns
 */
export const RobotControlCommandSend =
	(
		robotId: string,
		command: RobotDetailCommandsTypeEnum,
		option?:
			| RobotDetailControlModeTypeEnum
			| RobotDetailCommandsMuteSensorsTypeEnum
			| string
			| number
	) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: RobotTypeEnum.ROC_CONTROL
		};

		return RobotsService.robotControlCommandSend(robotId, command, option).then(async (res) => {
			// deserialize response
			const result = await deserializeRobot(res);

			// dispatch: success
			dispatch(success({ ...state, response: result }));
		});
	};

/**
 * request robot camera image
 * @param camera
 * @param robotId
 * @returns
 */
export const RobotCommandCameraImageRequest =
	(camera: RobotDetailCameraTypeEnum, robotId: string) => async (dispatch: Dispatch) => {
		const state = {
			module: RobotTypeEnum.COMMAND_CAMERA
		};

		return RobotsService.robotRequestCameraImage(camera, robotId).then(async (res) => {
			// deserialize response
			const result = await deserializeRobot(res);

			// dispatch: success
			dispatch(success({ ...state, response: result }));
		});
	};
