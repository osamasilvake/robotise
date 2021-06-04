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
import SitesService from '../../screens/business/sites/Sites.service';
import { timeout } from '../../utilities/methods/Timeout';
import { deserializeRobot } from '../../utilities/serializers/json-api/Robot.deserialize';
import { deserializeSite } from '../../utilities/serializers/json-api/Site.deserialize';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
import { RobotTypeEnum } from './Robot.slice.enum';
import { SliceRobotInterface } from './Robot.slice.interface';

// initial state
export const initialState: SliceRobotInterface = {
	servicePositions: {
		loading: false,
		content: null,
		errors: null
	},
	map: {
		loading: false,
		content: null,
		errors: null
	},
	control: {
		loading: false,
		content: null,
		errors: null
	},
	camera: {
		loading: false,
		content: null,
		errors: null
	},
	syncProducts: {
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
			if (module === RobotTypeEnum.SERVICE_POSITIONS) {
				state.servicePositions.loading = true;
			} else if (module === RobotTypeEnum.MAP) {
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
			if (module === RobotTypeEnum.SERVICE_POSITIONS) {
				state.servicePositions.loading = false;
				state.servicePositions.content = response;
				state.servicePositions.errors = null;
			} else if (module === RobotTypeEnum.MAP) {
				state.map.loading = false;
				state.map.content = response;
				state.map.errors = null;
			} else if (module === RobotTypeEnum.ROC_CONTROL) {
				state.control.loading = false;
				state.control.content = response;
				state.camera.errors = null;
			} else if (module === RobotTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = false;
				state.camera.content = response;
				state.camera.errors = null;
			} else if (module === RobotTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = false;
				state.syncProducts.content = response;
				state.syncProducts.errors = null;
			}
		},
		failure: (state, action) => {
			const { module, error } = action.payload;
			if (module === RobotTypeEnum.SERVICE_POSITIONS) {
				state.servicePositions.loading = false;
				state.servicePositions.content = null;
				state.servicePositions.errors = error;
			} else if (module === RobotTypeEnum.MAP) {
				state.map.loading = false;
				state.map.content = null;
				state.map.errors = error;
			} else if (module === RobotTypeEnum.ROC_CONTROL) {
				state.control.loading = false;
				state.control.content = null;
				state.control.errors = error;
			} else if (module === RobotTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = false;
				state.camera.content = null;
				state.camera.errors = error;
			} else if (module === RobotTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = false;
				state.syncProducts.content = null;
				state.syncProducts.errors = error;
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
 * fetch service positions per site
 * @param siteId
 * @returns
 */
export const RobotServicePositionsFetch = (siteId: string) => async (dispatch: Dispatch) => {
	const state = {
		module: RobotTypeEnum.SERVICE_POSITIONS
	};

	// dispatch: loading
	dispatch(loading(state));

	// fetch sites list
	return SitesService.siteServicePositionsFetch(siteId)
		.then(async (res) => {
			// deserialize response
			const result = await deserializeSite(res);

			// dispatch: success
			dispatch(success({ ...state, response: { data: result, site: { id: siteId } } }));
		})
		.catch((err) => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'fetch-site-service-positions-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'COMMON.SERVICE_POSITIONS.ERROR'
			};
			dispatch(triggerMessage(message));

			// dispatch: failure
			dispatch(failure({ ...state, error: err }));
		});
};

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
				id: `robot-map-location-error`,
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

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotControlCommandSend(robotId, command, option)
			.then(async (res) => {
				// deserialize response
				const result = await deserializeRobot(res);

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
				dispatch(success({ ...state, response: result }));
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
			.then(async (res) => {
				// deserialize response
				const result = await deserializeRobot(res);

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
				dispatch(success({ ...state, response: result }));
			})
			.catch((err) => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-${camera}-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.DETAIL.CAMERAS.${camera}.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure({ ...state, error: err }));
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
		.then(async (res) => {
			// deserialize response
			const result = await deserializeRobot(res);

			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: `robot-sync-products-success`,
				show: true,
				severity: TriggerMessageTypeEnum.SUCCESS,
				text: `ROBOTS.CONFIGURATION.SYNC_PRODUCTS.SUCCESS`
			};
			dispatch(triggerMessage(message));

			// dispatch: success
			dispatch(success({ ...state, response: result }));
		})
		.catch((err) => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: `robot-sync-products-error`,
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: `ROBOTS.CONFIGURATION.SYNC_PRODUCTS.ERROR`
			};
			dispatch(triggerMessage(message));

			// dispatch: failure
			dispatch(failure({ ...state, error: err }));
		});
};
