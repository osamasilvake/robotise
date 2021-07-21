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
import { timeout } from '../../utilities/methods/Timeout';
import { deserializeRobot } from '../../utilities/serializers/json-api/Robot.deserialize';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
import { RobotTypeEnum } from './Robot.slice.enum';
import { SliceRobotInterface } from './Robot.slice.interface';

// initial state
export const initialState: SliceRobotInterface = {
	map: {
		loading: false,
		content: null
	},
	control: {
		loading: false
	},
	camera: {
		loading: false
	},
	syncProducts: {
		loading: false
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
			} else if (module === RobotTypeEnum.ROC_CONTROL) {
				state.control.loading = true;
			} else if (module === RobotTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = true;
			} else if (module === RobotTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = true;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === RobotTypeEnum.MAP) {
				state.map.loading = false;
				state.map.content = response;
			} else if (module === RobotTypeEnum.ROC_CONTROL) {
				state.control.loading = false;
			} else if (module === RobotTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = false;
			} else if (module === RobotTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = false;
			}
		},
		failure: (state, action) => {
			const { module } = action.payload;
			if (module === RobotTypeEnum.MAP) {
				state.map.loading = false;
			} else if (module === RobotTypeEnum.ROC_CONTROL) {
				state.control.loading = false;
			} else if (module === RobotTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = false;
			} else if (module === RobotTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = false;
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
		.catch(() => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: `robot-map-location-error`,
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: `ROBOTS.DETAIL.MAP.ERROR`
			};
			dispatch(triggerMessage(message));

			// dispatch: failure
			dispatch(failure(state));
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

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotControlCommandSend(robotId, command, option)
			.then(async () => {
				// wait
				await timeout(3000);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-command-control-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `ROBOTS.DETAIL.COMMANDS.SUCCESS`
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-command-control-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.DETAIL.COMMANDS.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
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

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotRequestCameraImage(camera, robotId)
			.then(async () => {
				// wait
				await timeout(3000);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-${camera}-success`,
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `ROBOTS.DETAIL.CAMERAS.${camera}.SUCCESS`
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-${camera}-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.DETAIL.CAMERAS.${camera}.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * sync products with robot GUI
 * @param robotId
 * @returns
 */
export const RobotSyncProducts = (robotId: string) => async (dispatch: Dispatch) => {
	const state = {
		module: RobotTypeEnum.SYNC_PRODUCTS
	};

	// dispatch: loading
	dispatch(loading(state));

	return RobotsService.robotSyncProducts(robotId)
		.then(async () => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: `robot-sync-products-success`,
				show: true,
				severity: TriggerMessageTypeEnum.SUCCESS,
				text: `ROBOTS.CONFIGURATION.SYNC_PRODUCTS.SUCCESS`
			};
			dispatch(triggerMessage(message));

			// dispatch: success
			dispatch(success(state));
		})
		.catch(() => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: `robot-sync-products-error`,
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: `ROBOTS.CONFIGURATION.SYNC_PRODUCTS.ERROR`
			};
			dispatch(triggerMessage(message));

			// dispatch: failure
			dispatch(failure(state));
		});
};
