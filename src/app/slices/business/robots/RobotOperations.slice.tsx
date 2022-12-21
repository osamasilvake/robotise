import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { RobotDetailCameraTypeEnum } from '../../../screens/business/robots/content/detail/cameras/RobotDetailCameras.enum';
import {
	RobotDetailCommandsMuteSensorsTypeEnum,
	RobotDetailCommandsTypeEnum,
	RobotDetailControlModeTypeEnum
} from '../../../screens/business/robots/content/detail/commands/RobotDetailCommands.enum';
import { NoteFormInterface } from '../../../screens/business/robots/content/detail/general/RobotDetailGeneral.interface';
import { RobotDetailRemoteSafetyResetOptionsInterface } from '../../../screens/business/robots/content/detail/remote-safety-reset/RobotDetailRemoteSafetyReset.interface';
import RobotsService from '../../../screens/business/robots/Robots.service';
import { timeout } from '../../../utilities/methods/Timeout';
import { RootState } from '../..';
import { triggerMessage } from '../../app/App.slice';
import { deserializeMap } from './RobotOperations.slice.deserialize';
import { RobotOperationsTypeEnum } from './RobotOperations.slice.enum';
import { SliceRobotOperationsInterface } from './RobotOperations.slice.interface';

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
	remoteSafetyReset: {
		loading: false
	},
	camera: {
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
			} else if (module === RobotOperationsTypeEnum.REMOTE_SAFETY_RESET) {
				state.remoteSafetyReset.loading = true;
			} else if (module === RobotOperationsTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = true;
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
			} else if (module === RobotOperationsTypeEnum.REMOTE_SAFETY_RESET) {
				state.remoteSafetyReset.loading = false;
			} else if (module === RobotOperationsTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = false;
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
			} else if (module === RobotOperationsTypeEnum.REMOTE_SAFETY_RESET) {
				state.remoteSafetyReset.loading = false;
			} else if (module === RobotOperationsTypeEnum.COMMAND_CAMERA) {
				state.camera.loading = false;
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const robotOperationsSelector = (state: RootState) => state['robotOperations'];

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
					id: 'operation-note-success',
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
					id: 'operation-note-error',
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
	(mapId: string) => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
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
					id: 'operation-map-error',
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
					id: 'operation-command-control-success',
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
					id: 'operation-command-control-error',
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
 * send remote safety reset command
 * @param robotId
 * @param options
 * @returns
 */
export const RobotRemoteSafetyResetCommandSend =
	(robotId: string, options: RobotDetailRemoteSafetyResetOptionsInterface) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: RobotOperationsTypeEnum.REMOTE_SAFETY_RESET
		};

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotRemoteSafetyResetCommandSend(robotId, options)
			.then(async () => {
				// wait
				await timeout(3000);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'operation-remote-safety-reset-command-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.DETAIL.REMOTE_SAFETY_RESET.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'operation-remote-safety-reset-command-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.DETAIL.REMOTE_SAFETY_RESET.ERROR'
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
					id: `operation-${camera}-success`,
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
					id: `operation-${camera}-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.DETAIL.CAMERAS.${camera}.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};
