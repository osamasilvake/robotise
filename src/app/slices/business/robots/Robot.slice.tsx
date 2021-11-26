import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { ExternalLinkPayloadInterface } from '../../../components/common/external-link/ExternalLink.interface';
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
import { deserializeRobot } from './Robot.slice.deserialize';
import { RobotTypeEnum } from './Robot.slice.enum';
import { SliceRobotInterface, SRContentDeepLinkInterface } from './Robot.slice.interface';

// initial state
export const initialState: SliceRobotInterface = {
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
	auditLogs: {
		loading: false,
		content: null
	},
	battery: {
		loading: false,
		content: null
	},
	temperature: {
		loading: false,
		content: null
	},
	itemTracking: {
		loading: false,
		content: null
	},
	elevatorLogs: {
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
	name: 'Robot',
	initialState,
	reducers: {
		loading: (state, action) => {
			const { module } = action.payload;
			if (module === RobotTypeEnum.NOTE) {
				state.note.loading = true;
			} else if (module === RobotTypeEnum.MAP) {
				state.map.loading = true;
			} else if (module === RobotTypeEnum.ROC_CONTROL) {
				state.control.loading = true;
			} else if (module === RobotTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = true;
			} else if (module === RobotTypeEnum.AUDIT_LOGS) {
				state.auditLogs.loading = true;
			} else if (module === RobotTypeEnum.BATTERY) {
				state.battery.loading = true;
			} else if (module === RobotTypeEnum.TEMPERATURE) {
				state.temperature.loading = true;
			} else if (module === RobotTypeEnum.ITEM_TRACKING) {
				state.itemTracking.loading = true;
			} else if (module === RobotTypeEnum.ELEVATOR_LOGS) {
				state.elevatorLogs.loading = true;
			} else if (module === RobotTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = true;
			} else if (module === RobotTypeEnum.ROBOT_CONFIG) {
				state.robotConfig.loading = true;
			} else if (module === RobotTypeEnum.ROBOT_SITE_CONFIG) {
				state.robotSiteConfig.loading = true;
			} else if (module === RobotTypeEnum.REPORTS) {
				state.reports.loading = true;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === RobotTypeEnum.NOTE) {
				state.note.loading = false;
			} else if (module === RobotTypeEnum.MAP) {
				state.map.loading = false;
				state.map.content = response;
			} else if (module === RobotTypeEnum.ROC_CONTROL) {
				state.control.loading = false;
			} else if (module === RobotTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = false;
			} else if (module === RobotTypeEnum.AUDIT_LOGS) {
				state.auditLogs.loading = false;
				state.auditLogs.content = response;
			} else if (module === RobotTypeEnum.BATTERY) {
				state.battery.loading = false;
				state.battery.content = response;
			} else if (module === RobotTypeEnum.TEMPERATURE) {
				state.temperature.loading = false;
				state.temperature.content = response;
			} else if (module === RobotTypeEnum.ITEM_TRACKING) {
				state.itemTracking.loading = false;
				state.itemTracking.content = response;
			} else if (module === RobotTypeEnum.ELEVATOR_LOGS) {
				state.elevatorLogs.loading = false;
				state.elevatorLogs.content = response;
			} else if (module === RobotTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = false;
			} else if (module === RobotTypeEnum.ROBOT_CONFIG) {
				state.robotConfig.loading = false;
			} else if (module === RobotTypeEnum.ROBOT_SITE_CONFIG) {
				state.robotSiteConfig.loading = false;
			} else if (module === RobotTypeEnum.REPORTS) {
				state.reports.loading = false;
			}
		},
		failure: (state, action) => {
			const { module, response } = action.payload;
			if (module === RobotTypeEnum.NOTE) {
				state.note.loading = false;
			} else if (module === RobotTypeEnum.MAP) {
				state.map.loading = false;
				state.map.content = response;
			} else if (module === RobotTypeEnum.ROC_CONTROL) {
				state.control.loading = false;
			} else if (module === RobotTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = false;
			} else if (module === RobotTypeEnum.AUDIT_LOGS) {
				state.auditLogs.loading = false;
				state.auditLogs.content = response;
			} else if (module === RobotTypeEnum.BATTERY) {
				state.battery.loading = false;
				state.battery.content = response;
			} else if (module === RobotTypeEnum.TEMPERATURE) {
				state.temperature.loading = false;
				state.temperature.content = response;
			} else if (module === RobotTypeEnum.ITEM_TRACKING) {
				state.itemTracking.loading = false;
				state.itemTracking.content = response;
			} else if (module === RobotTypeEnum.ELEVATOR_LOGS) {
				state.elevatorLogs.loading = false;
				state.elevatorLogs.content = response;
			} else if (module === RobotTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = false;
			} else if (module === RobotTypeEnum.ROBOT_CONFIG) {
				state.robotConfig.loading = false;
			} else if (module === RobotTypeEnum.ROBOT_SITE_CONFIG) {
				state.robotSiteConfig.loading = false;
			} else if (module === RobotTypeEnum.REPORTS) {
				state.reports.loading = false;
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
			module: RobotTypeEnum.NOTE
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
					id: `robot-note-success`,
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `ROBOTS.DETAIL.NOTE.SUCCESS`
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-note-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.DETAIL.NOTE.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch robot map location
 * @param mapId
 * @returns
 */
export const RobotMapLocationFetch = (mapId: string) => async (dispatch: Dispatch) => {
	const state = {
		module: RobotTypeEnum.MAP
	};

	// dispatch: loading
	dispatch(loading(state));

	return RobotsService.robotMapLocationFetch(mapId)
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
			dispatch(failure({ ...state, response: message }));
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
 * request robot camera command
 * @param camera
 * @param robotId
 * @returns
 */
export const RobotCameraCommandRequest =
	(camera: RobotDetailCameraTypeEnum, robotId: string) => async (dispatch: Dispatch) => {
		const state = {
			module: RobotTypeEnum.COMMAND_CAMERA
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
 * fetch audit logs link
 * @param payload
 * @param callback
 * @returns
 */
export const RobotAuditLogsLinkFetch =
	(
		payload: ExternalLinkPayloadInterface,
		callback: (report: SRContentDeepLinkInterface) => void
	) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: RobotTypeEnum.AUDIT_LOGS
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return RobotsService.robotAuditLogsLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-audit-logs-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.DETAIL.AUDIT_LOGS.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure({ ...state, response: message }));
			});
	};

/**
 * fetch battery link
 * @param payload
 * @param callback
 * @returns
 */
export const RobotBatteryLinkFetch =
	(
		payload: ExternalLinkPayloadInterface,
		callback: (report: SRContentDeepLinkInterface) => void
	) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: RobotTypeEnum.BATTERY
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return RobotsService.robotBatteryLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-battery-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.DETAIL.BATTERY.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure({ ...state, response: message }));
			});
	};

/**
 * fetch temperature link
 * @param payload
 * @param callback
 * @returns
 */
export const RobotTemperatureLinkFetch =
	(
		payload: ExternalLinkPayloadInterface,
		callback: (report: SRContentDeepLinkInterface) => void
	) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: RobotTypeEnum.TEMPERATURE
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return RobotsService.robotTemperatureLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-temperature-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.DETAIL.TEMPERATURE.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure({ ...state, response: message }));
			});
	};

/**
 * fetch item tracking link
 * @param payload
 * @param callback
 * @returns
 */
export const RobotItemTrackingLinkFetch =
	(
		payload: ExternalLinkPayloadInterface,
		callback: (report: SRContentDeepLinkInterface) => void
	) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: RobotTypeEnum.ITEM_TRACKING
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return RobotsService.robotItemTrackingLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-item-tracking-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.PURCHASES.ITEM_TRACKING.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure({ ...state, response: message }));
			});
	};

/**
 * fetch elevator logs link
 * @param payload
 * @param callback
 * @returns
 */
export const RobotElevatorLogsLinkFetch =
	(
		payload: ExternalLinkPayloadInterface,
		callback: (report: SRContentDeepLinkInterface) => void
	) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: RobotTypeEnum.ELEVATOR_LOGS
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return RobotsService.robotElevatorLogsLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-elevator-logs-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.ELEVATOR_CALLS.ELEVATOR_LOGS.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure({ ...state, response: message }));
			});
	};

/**
 * sync products on the robot
 * @param robotId
 * @returns
 */
export const RobotProductsSync = (robotId: string) => async (dispatch: Dispatch) => {
	const state = {
		module: RobotTypeEnum.SYNC_PRODUCTS
	};

	// dispatch: loading
	dispatch(loading(state));

	return RobotsService.robotProductsSync(robotId)
		.then(() => {
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
			module: RobotTypeEnum.ROBOT_CONFIG
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
					id: `robot-config-success`,
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `ROBOTS.CONFIGURATION.ROBOT_CONFIG.SUCCESS`
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-config-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.CONFIGURATION.ROBOT_CONFIG.ERROR`
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
			module: RobotTypeEnum.ROBOT_SITE_CONFIG
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
					id: `robot-site-config-success`,
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `ROBOTS.CONFIGURATION.ROBOT_SITE_CONFIG.SUCCESS`
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-site-config-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.CONFIGURATION.ROBOT_SITE_CONFIG.ERROR`
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
			module: RobotTypeEnum.REPORTS
		};

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotReportsGenerate(robotId, payload)
			.then(async (res) => {
				// callback
				callback(res);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-generate-reports-success`,
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `COMMON.REPORTS.SUCCESS`
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `robot-generate-reports-success`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `COMMON.REPORTS.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};
