import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';
import { RobotConfigFormInterface } from '../../../../../screens/business/robots/content/configuration/cloud/robot-config/RobotConfig.interface';
import { RobotConfigurationSyncConfigsTypeEnum } from '../../../../../screens/business/robots/content/configuration/cloud/sync-configs/RobotConfigurationSyncConfigs.enum';
import RobotsService from '../../../../../screens/business/robots/Robots.service';
import { timeout } from '../../../../../utilities/methods/Timeout';
import { RootState } from '../../../..';
import { triggerMessage } from '../../../../app/App.slice';
import { CloudConfigurationTypeEnum } from './CloudConfiguration.slice.enum';
import { SliceCloudConfigurationInterface } from './CloudConfiguration.slice.interface';

// initial state
export const initialState: SliceCloudConfigurationInterface = {
	emergencyState: {
		loading: false
	},
	syncProducts: {
		loading: false
	},
	robotConfig: {
		loading: false
	},
	syncConfigs: {
		loading: false
	}
};

// slice
const dataSlice = createSlice({
	name: 'Cloud Configuration',
	initialState,
	reducers: {
		loading: (state, action) => {
			const { module } = action.payload;
			if (module === CloudConfigurationTypeEnum.EMERGENCY_STATE) {
				state.emergencyState.loading = true;
			} else if (module === CloudConfigurationTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = true;
			} else if (module === CloudConfigurationTypeEnum.ROBOT_CONFIG) {
				state.robotConfig.loading = true;
			} else if (module === CloudConfigurationTypeEnum.SYNC_CONFIGS) {
				state.syncConfigs.loading = true;
			}
		},
		success: (state, action) => {
			const { module } = action.payload;
			if (module === CloudConfigurationTypeEnum.EMERGENCY_STATE) {
				state.emergencyState.loading = false;
			} else if (module === CloudConfigurationTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = false;
			} else if (module === CloudConfigurationTypeEnum.ROBOT_CONFIG) {
				state.robotConfig.loading = false;
			} else if (module === CloudConfigurationTypeEnum.SYNC_CONFIGS) {
				state.syncConfigs.loading = false;
			}
		},
		failure: (state, action) => {
			const { module } = action.payload;
			if (module === CloudConfigurationTypeEnum.EMERGENCY_STATE) {
				state.emergencyState.loading = false;
			} else if (module === CloudConfigurationTypeEnum.SYNC_PRODUCTS) {
				state.syncProducts.loading = false;
			} else if (module === CloudConfigurationTypeEnum.ROBOT_CONFIG) {
				state.robotConfig.loading = false;
			} else if (module === CloudConfigurationTypeEnum.SYNC_CONFIGS) {
				state.syncConfigs.loading = false;
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const cloudConfigurationSelector = (state: RootState) => state['cloudConfiguration'];

// reducer
export default dataSlice.reducer;

/**
 * set emergency state
 * @param robotId
 * @param isInEmergencyState
 * @param callback
 * @returns
 */
export const CloudConfigurationSetEmergencyState =
	(robotId: string, isInEmergencyState: boolean, callback: () => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: CloudConfigurationTypeEnum.EMERGENCY_STATE
		};

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotSetEmergencyState(robotId, isInEmergencyState)
			.then(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'configuration-emergency-state-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.CONFIGURATION.EMERGENCY_STATE.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));

				// callback
				callback();
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'configuration-emergency-state-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.CONFIGURATION.EMERGENCY_STATE.ERROR'
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
export const CloudConfigurationProductsSync = (robotId: string) => async (dispatch: Dispatch) => {
	const state = {
		module: CloudConfigurationTypeEnum.SYNC_PRODUCTS
	};

	// dispatch: loading
	dispatch(loading(state));

	return RobotsService.robotProductsSync(robotId)
		.then(() => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'configuration-sync-products-success',
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
				id: 'configuration-sync-products-error',
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
export const CloudConfigurationConfigUpdate =
	(robotId: string, payload: RobotConfigFormInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: CloudConfigurationTypeEnum.ROBOT_CONFIG
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
					id: 'configuration-config-success',
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
					id: 'configuration-config-error',
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
 * sync configs of robot/site
 * @param robotId
 * @param type
 * @param callback
 * @returns
 */
export const CloudConfigurationSyncConfigs =
	(robotId: string, type: RobotConfigurationSyncConfigsTypeEnum, callback: () => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: CloudConfigurationTypeEnum.SYNC_CONFIGS
		};

		// dispatch: loading
		dispatch(loading(state));

		return RobotsService.robotSyncConfigs(robotId, type)
			.then(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'configuration-sync-configs-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.CONFIGURATION.SYNC_CONFIGS.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));

				// callback
				callback();
			})
			.catch((err) => {
				const errMessage = err && err?.data && err?.data?.attributes?.reason;

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'configuration-sync-configs-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: errMessage || 'ROBOTS.CONFIGURATION.SYNC_CONFIGS.ERROR',
					dynamicText: !!errMessage
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};
