import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { ExternalLinkPayloadInterface } from '../../../components/common/external-link/ExternalLink.interface';
import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import DeepLinksService from '../../../screens/settings/deep-links/DeepLinks.service';
import { timeout } from '../../../utilities/methods/Timeout';
import { AppReducerType } from '../..';
import { triggerMessage } from '../../app/App.slice';
import { SDContentInterface, SliceDeepLinkInterface } from './DeepLink.interface';
import { DeepLinkTypeEnum } from './DeepLink.slice.enum';

// initial state
export const initialState: SliceDeepLinkInterface = {
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
	diagnosticsLogs: {
		loading: false,
		content: null
	},
	coolingUnit: {
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
	alertLogs: {
		loading: false,
		content: null
	}
};

// slice
const dataSlice = createSlice({
	name: 'Deep Link',
	initialState,
	reducers: {
		loading: (state, action) => {
			const { module } = action.payload;
			if (module === DeepLinkTypeEnum.AUDIT_LOGS) {
				state.auditLogs.loading = true;
			} else if (module === DeepLinkTypeEnum.BATTERY) {
				state.battery.loading = true;
			} else if (module === DeepLinkTypeEnum.TEMPERATURE) {
				state.temperature.loading = true;
			} else if (module === DeepLinkTypeEnum.DIAGNOSTICS_LOGS) {
				state.diagnosticsLogs.loading = true;
			} else if (module === DeepLinkTypeEnum.COOLING_UNIT) {
				state.coolingUnit.loading = true;
			} else if (module === DeepLinkTypeEnum.ITEM_TRACKING) {
				state.itemTracking.loading = true;
			} else if (module === DeepLinkTypeEnum.ELEVATOR_LOGS) {
				state.elevatorLogs.loading = true;
			} else if (module === DeepLinkTypeEnum.ALERT_LOGS) {
				state.alertLogs.loading = true;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === DeepLinkTypeEnum.AUDIT_LOGS) {
				state.auditLogs.loading = false;
				state.auditLogs.content = response;
			} else if (module === DeepLinkTypeEnum.BATTERY) {
				state.battery.loading = false;
				state.battery.content = response;
			} else if (module === DeepLinkTypeEnum.TEMPERATURE) {
				state.temperature.loading = false;
				state.temperature.content = response;
			} else if (module === DeepLinkTypeEnum.DIAGNOSTICS_LOGS) {
				state.diagnosticsLogs.loading = false;
				state.diagnosticsLogs.content = response;
			} else if (module === DeepLinkTypeEnum.COOLING_UNIT) {
				state.coolingUnit.loading = false;
				state.coolingUnit.content = response;
			} else if (module === DeepLinkTypeEnum.ITEM_TRACKING) {
				state.itemTracking.loading = false;
				state.itemTracking.content = response;
			} else if (module === DeepLinkTypeEnum.ELEVATOR_LOGS) {
				state.elevatorLogs.loading = false;
				state.elevatorLogs.content = response;
			} else if (module === DeepLinkTypeEnum.ALERT_LOGS) {
				state.alertLogs.loading = false;
				state.alertLogs.content = response;
			}
		},
		failure: (state, action) => {
			const { module } = action.payload;
			if (module === DeepLinkTypeEnum.AUDIT_LOGS) {
				state.auditLogs.loading = false;
				state.auditLogs.content = null;
			} else if (module === DeepLinkTypeEnum.BATTERY) {
				state.battery.loading = false;
				state.battery.content = null;
			} else if (module === DeepLinkTypeEnum.TEMPERATURE) {
				state.temperature.loading = false;
				state.temperature.content = null;
			} else if (module === DeepLinkTypeEnum.DIAGNOSTICS_LOGS) {
				state.diagnosticsLogs.loading = false;
				state.diagnosticsLogs.content = null;
			} else if (module === DeepLinkTypeEnum.COOLING_UNIT) {
				state.coolingUnit.loading = false;
				state.coolingUnit.content = null;
			} else if (module === DeepLinkTypeEnum.ITEM_TRACKING) {
				state.itemTracking.loading = false;
				state.itemTracking.content = null;
			} else if (module === DeepLinkTypeEnum.ELEVATOR_LOGS) {
				state.elevatorLogs.loading = false;
				state.elevatorLogs.content = null;
			} else if (module === DeepLinkTypeEnum.ALERT_LOGS) {
				state.alertLogs.loading = false;
				state.alertLogs.content = null;
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const deepLinkSelector = (state: AppReducerType) => state['deepLink'];

// reducer
export default dataSlice.reducer;

/**
 * fetch audit logs link
 * @param payload
 * @param callback
 * @returns
 */
export const DeepLinkAuditLogsLinkFetch =
	(payload: ExternalLinkPayloadInterface, callback: (data: SDContentInterface) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: DeepLinkTypeEnum.AUDIT_LOGS
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return DeepLinksService.deepLinkAuditLogsLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-link-audit-logs-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.AUDIT_LOGS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch battery link
 * @param payload
 * @param callback
 * @returns
 */
export const DeepLinkBatteryLinkFetch =
	(payload: ExternalLinkPayloadInterface, callback: (data: SDContentInterface) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: DeepLinkTypeEnum.BATTERY
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return DeepLinksService.deepLinkBatteryLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-link-battery-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.BATTERY.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch temperature link
 * @param payload
 * @param callback
 * @returns
 */
export const DeepLinkTemperatureLinkFetch =
	(payload: ExternalLinkPayloadInterface, callback: (data: SDContentInterface) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: DeepLinkTypeEnum.TEMPERATURE
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return DeepLinksService.deepLinkTemperatureLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-link-temperature-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.TEMPERATURE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch diagnostics logs link
 * @param payload
 * @param callback
 * @returns
 */
export const DeepLinkDiagnosticsLogsLinkFetch =
	(payload: ExternalLinkPayloadInterface, callback: (data: SDContentInterface) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: DeepLinkTypeEnum.DIAGNOSTICS_LOGS
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return DeepLinksService.deepLinkDiagnosticsLogsLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-link-diagnostics-logs-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.DIAGNOSTICS_LOGS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch cooling unit link
 * @param payload
 * @param callback
 * @returns
 */
export const DeepLinkCoolingUnitLinkFetch =
	(payload: ExternalLinkPayloadInterface, callback: (data: SDContentInterface) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: DeepLinkTypeEnum.COOLING_UNIT
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return DeepLinksService.deepLinkCoolingUnitLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-link-cooling-unit-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.COOLING_UNIT.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch item tracking link
 * @param payload
 * @param callback
 * @returns
 */
export const DeepLinkItemTrackingLinkFetch =
	(payload: ExternalLinkPayloadInterface, callback: (data: SDContentInterface) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: DeepLinkTypeEnum.ITEM_TRACKING
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return DeepLinksService.deepLinkItemTrackingLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-link-item-tracking-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ITEM_TRACKING.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch elevator logs link
 * @param payload
 * @param callback
 * @returns
 */
export const DeepLinkElevatorLogsLinkFetch =
	(payload: ExternalLinkPayloadInterface, callback: (data: SDContentInterface) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: DeepLinkTypeEnum.ELEVATOR_LOGS
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return DeepLinksService.deepLinkElevatorLogsLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-link-elevator-logs-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ELEVATOR_LOGS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch alert logs link
 * @param payload
 * @param callback
 * @returns
 */
export const DeepLinkAlertLogsLinkFetch =
	(payload: ExternalLinkPayloadInterface, callback: (data: SDContentInterface) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: DeepLinkTypeEnum.ALERT_LOGS
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return DeepLinksService.deepLinkAlertLogsLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-link-alert-logs-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ALERT_LOGS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};
