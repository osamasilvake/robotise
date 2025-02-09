import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { ExternalLinkPayloadInterface } from '../../../components/common/external-link/ExternalLink.interface';
import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import DeepLinksService from '../../../screens/settings/deep-links/DeepLinks.service';
import { timeout } from '../../../utilities/methods/Timeout';
import { RootState } from '../..';
import { triggerMessage } from '../../app/App.slice';
import { SDContentInterface, SliceDeepLinkInterface } from './DeepLink.interface';
import { DeepLinkTypeEnum } from './DeepLink.slice.enum';

// initial state
export const initialState: SliceDeepLinkInterface = {
	alertLogs: {
		loading: false,
		content: null
	},
	alertDashboardLogs: {
		loading: false,
		content: null
	},
	auditLogs: {
		loading: false,
		content: null
	},
	battery: {
		loading: false,
		content: null
	},
	coolingUnit: {
		loading: false,
		content: null
	},
	diagnosticsLogs: {
		loading: false,
		content: null
	},
	elevatorDashboard: {
		loading: false,
		content: null
	},
	elevatorLogs: {
		loading: false,
		content: null
	},
	itemTracking: {
		loading: false,
		content: null
	},
	scrapper: {
		loading: false,
		content: null
	},
	temperature: {
		loading: false,
		content: null
	},
	wikiPage: {
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
			} else if (module === DeepLinkTypeEnum.ALERT_LOGS) {
				state.alertLogs.loading = true;
			} else if (module === DeepLinkTypeEnum.ALERT_DASHBOARD_LOGS) {
				state.alertDashboardLogs.loading = true;
			} else if (module === DeepLinkTypeEnum.BATTERY) {
				state.battery.loading = true;
			} else if (module === DeepLinkTypeEnum.COOLING_UNIT) {
				state.coolingUnit.loading = true;
			} else if (module === DeepLinkTypeEnum.DIAGNOSTICS_LOGS) {
				state.diagnosticsLogs.loading = true;
			} else if (module === DeepLinkTypeEnum.ELEVATOR_DASHBOARD) {
				state.elevatorDashboard.loading = true;
			} else if (module === DeepLinkTypeEnum.ELEVATOR_LOGS) {
				state.elevatorLogs.loading = true;
			} else if (module === DeepLinkTypeEnum.ITEM_TRACKING) {
				state.itemTracking.loading = true;
			} else if (module === DeepLinkTypeEnum.SCRAPPER) {
				state.scrapper.loading = true;
			} else if (module === DeepLinkTypeEnum.TEMPERATURE) {
				state.temperature.loading = true;
			} else if (module === DeepLinkTypeEnum.WIKI_PAGE) {
				state.wikiPage.loading = true;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === DeepLinkTypeEnum.AUDIT_LOGS) {
				state.auditLogs.loading = false;
				state.auditLogs.content = response;
			} else if (module === DeepLinkTypeEnum.ALERT_LOGS) {
				state.alertLogs.loading = false;
				state.alertLogs.content = response;
			} else if (module === DeepLinkTypeEnum.ALERT_DASHBOARD_LOGS) {
				state.alertDashboardLogs.loading = false;
				state.alertDashboardLogs.content = response;
			} else if (module === DeepLinkTypeEnum.BATTERY) {
				state.battery.loading = false;
				state.battery.content = response;
			} else if (module === DeepLinkTypeEnum.COOLING_UNIT) {
				state.coolingUnit.loading = false;
				state.coolingUnit.content = response;
			} else if (module === DeepLinkTypeEnum.DIAGNOSTICS_LOGS) {
				state.diagnosticsLogs.loading = false;
				state.diagnosticsLogs.content = response;
			} else if (module === DeepLinkTypeEnum.ELEVATOR_DASHBOARD) {
				state.elevatorDashboard.loading = false;
				state.elevatorDashboard.content = response;
			} else if (module === DeepLinkTypeEnum.ELEVATOR_LOGS) {
				state.elevatorLogs.loading = false;
				state.elevatorLogs.content = response;
			} else if (module === DeepLinkTypeEnum.ITEM_TRACKING) {
				state.itemTracking.loading = false;
				state.itemTracking.content = response;
			} else if (module === DeepLinkTypeEnum.SCRAPPER) {
				state.scrapper.loading = false;
				state.scrapper.content = response;
			} else if (module === DeepLinkTypeEnum.TEMPERATURE) {
				state.temperature.loading = false;
				state.temperature.content = response;
			} else if (module === DeepLinkTypeEnum.WIKI_PAGE) {
				state.wikiPage.loading = false;
				state.wikiPage.content = response;
			}
		},
		failure: (state, action) => {
			const { module } = action.payload;
			if (module === DeepLinkTypeEnum.AUDIT_LOGS) {
				state.auditLogs.loading = false;
				state.auditLogs.content = null;
			} else if (module === DeepLinkTypeEnum.ALERT_LOGS) {
				state.alertLogs.loading = false;
				state.alertLogs.content = null;
			} else if (module === DeepLinkTypeEnum.ALERT_DASHBOARD_LOGS) {
				state.alertDashboardLogs.loading = false;
				state.alertDashboardLogs.content = null;
			} else if (module === DeepLinkTypeEnum.BATTERY) {
				state.battery.loading = false;
				state.battery.content = null;
			} else if (module === DeepLinkTypeEnum.COOLING_UNIT) {
				state.coolingUnit.loading = false;
				state.coolingUnit.content = null;
			} else if (module === DeepLinkTypeEnum.DIAGNOSTICS_LOGS) {
				state.diagnosticsLogs.loading = false;
				state.diagnosticsLogs.content = null;
			} else if (module === DeepLinkTypeEnum.ELEVATOR_DASHBOARD) {
				state.elevatorDashboard.loading = false;
				state.elevatorDashboard.content = null;
			} else if (module === DeepLinkTypeEnum.ELEVATOR_LOGS) {
				state.elevatorLogs.loading = false;
				state.elevatorLogs.content = null;
			} else if (module === DeepLinkTypeEnum.ITEM_TRACKING) {
				state.itemTracking.loading = false;
				state.itemTracking.content = null;
			} else if (module === DeepLinkTypeEnum.SCRAPPER) {
				state.scrapper.loading = false;
				state.scrapper.content = null;
			} else if (module === DeepLinkTypeEnum.TEMPERATURE) {
				state.temperature.loading = false;
				state.temperature.content = null;
			} else if (module === DeepLinkTypeEnum.WIKI_PAGE) {
				state.wikiPage.loading = false;
				state.wikiPage.content = null;
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const deepLinkSelector = (state: RootState) => state['deepLink'];

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
					id: 'deep-link-audit-logs-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ERROR'
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
					id: 'deep-link-alert-logs-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch alert dashboard logs link
 * @param payload
 * @param callback
 * @returns
 */
export const DeepLinkAlertDashboardLogsLinkFetch =
	(payload: ExternalLinkPayloadInterface, callback: (data: SDContentInterface) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: DeepLinkTypeEnum.ALERT_DASHBOARD_LOGS
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return DeepLinksService.deepLinkAlertDashboardLogsLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-link-alert-dashboard-logs-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ERROR'
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
					id: 'deep-link-battery-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ERROR'
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
					id: 'deep-link-cooling-unit-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ERROR'
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
					id: 'deep-link-diagnostics-logs-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch elevator dashboard link
 * @param payload
 * @param callback
 * @returns
 */
export const DeepLinkElevatorDashboardLinkFetch =
	(payload: ExternalLinkPayloadInterface, callback: (data: SDContentInterface) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: DeepLinkTypeEnum.ELEVATOR_DASHBOARD
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return DeepLinksService.deepLinkElevatorDashboardLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-link-elevator-dashboard-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ERROR'
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
					id: 'deep-link-elevator-logs-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ERROR'
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
					id: 'deep-link-item-tracking-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch scrapper link
 * @param payload
 * @param callback
 * @returns
 */
export const DeepLinkScrapperLinkFetch =
	(payload: ExternalLinkPayloadInterface, callback: (data: SDContentInterface) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: DeepLinkTypeEnum.SCRAPPER
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return DeepLinksService.deepLinkScrapperLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-link-scrapper-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ERROR'
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
					id: 'deep-link-temperature-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch wiki page link
 * @param payload
 * @param callback
 * @returns
 */
export const DeepLinkWikiPageLinkFetch =
	(payload: ExternalLinkPayloadInterface, callback: (data: SDContentInterface) => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: DeepLinkTypeEnum.WIKI_PAGE
		};

		// dispatch: loading
		dispatch(loading(state));

		// wait
		await timeout(1000);

		return DeepLinksService.deepLinkWikiPageLinkFetch(payload)
			.then(async (res) => {
				// dispatch: success
				dispatch(success({ ...state, response: res }));

				// callback
				callback(res);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'deep-link-wiki-page-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'DEEP_LINKS.FETCH.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};
