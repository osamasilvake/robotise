import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { ReportFormInterface } from '../../../components/common/report/Report.interface';
import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { RobotConfigFormInterface } from '../../../screens/business/robots/content/configuration/robot-config/RobotConfig.interface';
import { RobotSiteConfigFormInterface } from '../../../screens/business/robots/content/configuration/robot-site-config/RobotSiteConfig.interface';
import { RobotDetailCameraTypeEnum } from '../../../screens/business/robots/content/detail/cameras/RobotDetailCameras.enum';
import {
	RobotDetailCommandsMuteSensorsTypeEnum,
	RobotDetailCommandsTypeEnum,
	RobotDetailControlModeTypeEnum
} from '../../../screens/business/robots/content/detail/commands/RobotDetailCommands.enum';
import { NoteFormInterface } from '../../../screens/business/robots/content/detail/general/RobotDetailGeneral.interface';
import RobotsService from '../../../screens/business/robots/Robots.service';
import { timeout } from '../../../utilities/methods/Timeout';
import { AppReducerType } from '../..';
import { triggerMessage } from '../../general/General.slice';
import { deserializeMap } from './RobotOperations.slice.deserialize';
import { RobotOperationsTypeEnum } from './RobotOperations.slice.enum';
import {
	SliceRobotOperationsInterface,
	SROContentElevatorTemplateInterface
} from './RobotOperations.slice.interface';

// initial state
export const initialState: SliceRobotOperationsInterface = {
	note: {
		loading: false
	},
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
	elevatorTemplate: {
		loading: false,
		content: null
	},
	syncProducts: {
		loading: false
	},
	robotConfig: {
		loading: false
	},
	robotSiteConfig: {
		loading: false
	},
	reports: {
		loading: false
	}
};

// slice
const dataSlice = createSlice({
	name: 'Robot Operations',
	initialState,
	reducers: {
		loading: (state, action) => {
			const { module } = action.payload;
			if (module === RobotOperationsTypeEnum.NOTE) {
				state.note.loading = true;
			} else if (module === RobotOperationsTypeEnum.MAP) {
				state.map.loading = true;
			} else if (module === RobotOperationsTypeEnum.ROC_CONTROL) {
				state.control.loading = true;
			} else if (module === RobotOperationsTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = true;
			} else if (module === RobotOperationsTypeEnum.ELEVATOR_TEMPLATE) {
				state.elevatorTemplate.loading = true;
			} else if (module === RobotOperationsTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = true;
			} else if (module === RobotOperationsTypeEnum.ROBOT_CONFIG) {
				state.robotConfig.loading = true;
			} else if (module === RobotOperationsTypeEnum.ROBOT_SITE_CONFIG) {
				state.robotSiteConfig.loading = true;
			} else if (module === RobotOperationsTypeEnum.REPORTS) {
				state.reports.loading = true;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === RobotOperationsTypeEnum.NOTE) {
				state.note.loading = false;
			} else if (module === RobotOperationsTypeEnum.MAP) {
				state.map.loading = false;
				state.map.content = response;
			} else if (module === RobotOperationsTypeEnum.ROC_CONTROL) {
				state.control.loading = false;
			} else if (module === RobotOperationsTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = false;
			} else if (module === RobotOperationsTypeEnum.ELEVATOR_TEMPLATE) {
				state.elevatorTemplate.loading = false;
				state.elevatorTemplate.content = response;
			} else if (module === RobotOperationsTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = false;
			} else if (module === RobotOperationsTypeEnum.ROBOT_CONFIG) {
				state.robotConfig.loading = false;
			} else if (module === RobotOperationsTypeEnum.ROBOT_SITE_CONFIG) {
				state.robotSiteConfig.loading = false;
			} else if (module === RobotOperationsTypeEnum.REPORTS) {
				state.reports.loading = false;
			}
		},
		failure: (state, action) => {
			const { module } = action.payload;
			if (module === RobotOperationsTypeEnum.NOTE) {
				state.note.loading = false;
			} else if (module === RobotOperationsTypeEnum.MAP) {
				state.map.loading = false;
				state.map.content = null;
			} else if (module === RobotOperationsTypeEnum.ROC_CONTROL) {
				state.control.loading = false;
			} else if (module === RobotOperationsTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = false;
			} else if (module === RobotOperationsTypeEnum.ELEVATOR_TEMPLATE) {
				state.elevatorTemplate.loading = false;
				state.elevatorTemplate.content = null;
			} else if (module === RobotOperationsTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = false;
			} else if (module === RobotOperationsTypeEnum.ROBOT_CONFIG) {
				state.robotConfig.loading = false;
			} else if (module === RobotOperationsTypeEnum.ROBOT_SITE_CONFIG) {
				state.robotSiteConfig.loading = false;
			} else if (module === RobotOperationsTypeEnum.REPORTS) {
				state.reports.loading = false;
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const robotOperationsSelector = (state: AppReducerType) => state['robotOperations'];

// reducer
export default dataSlice.reducer;

/**
 * update note field
 * @param robotId
 * @param payload
 * @param callback
 * @returns
 */
export const RobotNoteUpdate =
	(robotId: string, payload: NoteFormInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: RobotOperationsTypeEnum.NOTE
		};

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotNoteUpdate(robotId, payload)
			.then(async () => {
				// wait
				await timeout(1000);

				// callback
				callback();

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-note-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.DETAIL.NOTE.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-note-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.DETAIL.NOTE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch robot map
 * @param mapId
 * @returns
 */
export const RobotMapFetch =
	(mapId: string) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		const states = getState();
		const map = states.robotOperations.map;
		const state = {
			module: RobotOperationsTypeEnum.MAP
		};

		// return on busy
		if (map && map.loading) {
			return;
		}

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotMapFetch(mapId)
			.then(async (res) => {
				// deserialize response
				const result = await deserializeMap(res);

				// dispatch: success
				dispatch(success({ ...state, response: result }));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-map-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.DETAIL.MAP.ERROR'
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
			module: RobotOperationsTypeEnum.ROC_CONTROL
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
					text: 'ROBOTS.DETAIL.COMMANDS.SUCCESS'
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
					text: 'ROBOTS.DETAIL.COMMANDS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * request robot camera command
 * @param camera
 * @param robotId
 * @returns
 */
export const RobotCameraCommandRequest =
	(camera: RobotDetailCameraTypeEnum, robotId: string) => async (dispatch: Dispatch) => {
		const state = {
			module: RobotOperationsTypeEnum.COMMAND_CAMERA
		};

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotCameraCommandRequest(camera, robotId)
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
 * fetch elevator template
 * @param elevatorId
 */
export const RobotElevatorTemplateFetch =
	(elevatorId: string, callback: (data: SROContentElevatorTemplateInterface) => void) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		const states = getState();
		const elevatorTemplate = states.robotOperations.elevatorTemplate;
		const state = {
			module: RobotOperationsTypeEnum.ELEVATOR_TEMPLATE
		};

		// return on busy
		if (elevatorTemplate && elevatorTemplate.loading) {
			return;
		}

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return RobotsService.robotElevatorTemplateFetch(elevatorId)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-elevator-template-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.ELEVATOR_CALLS.TEMPLATE.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-elevator-template-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.ELEVATOR_CALLS.TEMPLATE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * sync products on the robot
 * @param robotId
 * @returns
 */
export const RobotProductsSync = (robotId: string) => async (dispatch: Dispatch) => {
	const state = {
		module: RobotOperationsTypeEnum.SYNC_PRODUCTS
	};

	// dispatch: loading
	dispatch(loading(state));

	return RobotsService.robotProductsSync(robotId)
		.then(() => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'robot-sync-products-success',
				show: true,
				severity: TriggerMessageTypeEnum.SUCCESS,
				text: 'ROBOTS.CONFIGURATION.SYNC_PRODUCTS.SUCCESS'
			};
			dispatch(triggerMessage(message));

			// dispatch: success
			dispatch(success(state));
		})
		.catch(() => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'robot-sync-products-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'ROBOTS.CONFIGURATION.SYNC_PRODUCTS.ERROR'
			};
			dispatch(triggerMessage(message));

			// dispatch: failure
			dispatch(failure(state));
		});
};

/**
 * update robot config
 * @param robotId
 * @param payload
 * @param callback
 * @returns
 */
export const RobotConfigUpdate =
	(robotId: string, payload: RobotConfigFormInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: RobotOperationsTypeEnum.ROBOT_CONFIG
		};

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotConfigUpdate(robotId, payload)
			.then(async () => {
				// callback
				callback();

				// wait
				await timeout(1000);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-config-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.CONFIGURATION.ROBOT_CONFIG.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-config-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.CONFIGURATION.ROBOT_CONFIG.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * update robot site config
 * @param robotId
 * @param payload
 * @param callback
 * @returns
 */
export const RobotSiteConfigUpdate =
	(robotId: string, payload: RobotSiteConfigFormInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: RobotOperationsTypeEnum.ROBOT_SITE_CONFIG
		};

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotSiteConfigUpdate(robotId, payload)
			.then(async () => {
				// callback
				callback();

				// wait
				await timeout(1000);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-site-config-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.CONFIGURATION.ROBOT_SITE_CONFIG.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-site-config-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.CONFIGURATION.ROBOT_SITE_CONFIG.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * generate reports
 * @param robotId
 * @param payload
 * @param callback
 * @returns
 */
export const RobotReportsGenerate =
	(robotId: string, payload: ReportFormInterface, callback: (report: string) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: RobotOperationsTypeEnum.REPORTS
		};

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotReportsGenerate(robotId, payload)
			.then(async (res) => {
				// callback
				callback(res);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-generate-reports-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'COMMON.REPORTS.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'robot-generate-reports-success',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'COMMON.REPORTS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};
