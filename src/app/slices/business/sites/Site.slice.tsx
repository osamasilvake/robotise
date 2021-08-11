import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { ReportTypeEnum } from '../../../components/common/report/Report.enum';
import { ReportPayloadInterface } from '../../../components/common/report/Report.interface';
import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { DialogCreateEditNotificationPayloadInterface } from '../../../screens/business/sites/content/configuration/notifications/SiteNotifications.interface';
import SitesService from '../../../screens/business/sites/Sites.service';
import { timeout } from '../../../utilities/methods/Timeout';
import { AppReducerType } from '../..';
import { triggerMessage } from '../../general/General.slice';
import { deserializeSite } from './Site.deserialize';
import { SiteTypeEnum } from './Site.slice.enum';
import {
	SliceSiteInterface,
	SSContentNotificationTypeInterface,
	SSContentNotificationUsersInterface
} from './Site.slice.interface';

// initial state
export const initialState: SliceSiteInterface = {
	servicePositions: {
		loading: false,
		content: null
	},
	acceptOrders: {
		loading: false
	},
	notifications: {
		loader: false,
		loading: false,
		content: null,
		errors: null
	},
	reports: {
		loading: false
	}
};

// slice
const dataSlice = createSlice({
	name: 'Site',
	initialState,
	reducers: {
		loader: (state, action) => {
			const { module } = action.payload;
			if (module === SiteTypeEnum.NOTIFICATIONS) {
				state.notifications.loader = true;
			}
		},
		loading: (state, action) => {
			const { module } = action.payload;
			if (module === SiteTypeEnum.SERVICE_POSITIONS) {
				state.servicePositions.loading = true;
			} else if (module === SiteTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = true;
			} else if (module === SiteTypeEnum.NOTIFICATIONS) {
				state.notifications.loading = true;
			} else if (module === SiteTypeEnum.REPORTS) {
				state.reports.loading = true;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === SiteTypeEnum.SERVICE_POSITIONS) {
				state.servicePositions.loading = false;
				state.servicePositions.content = response;
			} else if (module === SiteTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = false;
			} else if (module === SiteTypeEnum.NOTIFICATIONS) {
				state.notifications.loader = false;
				state.notifications.loading = false;
				state.notifications.content = response;
			} else if (module === SiteTypeEnum.REPORTS) {
				state.reports.loading = false;
			}
		},
		failure: (state, action) => {
			const { module, response } = action.payload;
			if (module === SiteTypeEnum.SERVICE_POSITIONS) {
				state.servicePositions.loading = false;
				state.servicePositions.content = null;
			} else if (module === SiteTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = false;
			} else if (module === SiteTypeEnum.NOTIFICATIONS) {
				state.notifications.loader = false;
				state.notifications.loading = false;
				state.notifications.errors = response;
			} else if (module === SiteTypeEnum.REPORTS) {
				state.reports.loading = false;
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, reset } = dataSlice.actions;

// selector
export const siteSelector = (state: AppReducerType) => state['site'];

// reducer
export default dataSlice.reducer;

/**
 * fetch service positions
 * @param siteId
 * @returns
 */
export const SiteServicePositionsFetch = (siteId: string) => async (dispatch: Dispatch) => {
	const state = {
		module: SiteTypeEnum.SERVICE_POSITIONS
	};

	// dispatch: loading
	dispatch(loading(state));

	return SitesService.siteServicePositionsFetch(siteId)
		.then(async (res) => {
			// deserialize response
			const result = await deserializeSite(res);

			// dispatch: success
			dispatch(
				success({
					...state,
					response: {
						data: result,
						site: { id: siteId }
					}
				})
			);
		})
		.catch(() => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'fetch-site-service-positions-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'COMMON.SERVICE_POSITIONS.ERROR'
			};
			dispatch(triggerMessage(message));

			// dispatch: failure
			dispatch(failure(state));
		});
};

/**
 * accept orders
 * @param siteId
 * @param acceptOrders
 * @param callback
 * @returns
 */
export const SiteOrdersAccept =
	(siteId: string, acceptOrders: boolean, callback: () => void) => async (dispatch: Dispatch) => {
		const state = {
			module: SiteTypeEnum.ACCEPT_ORDERS
		};

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteOrdersAccept(siteId, acceptOrders)
			.then(async () => {
				// callback
				callback();

				// wait
				await timeout(1000);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `site-accept-orders-success`,
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `SITES.CONFIGURATION.ACCEPT_ORDERS.SUCCESS`
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `site-accept-orders-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `SITES.CONFIGURATION.ACCEPT_ORDERS.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch notification types and users
 * @param siteId
 * @param refresh
 * @returns
 */
export const SiteNotificationTypesAndUsersFetch =
	(siteId: string, refresh = false) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: SiteTypeEnum.NOTIFICATIONS
		};

		// dispatch: loader/loading
		dispatch(!refresh ? loader(state) : loading(state));

		return Promise.all([
			SitesService.siteNotificationTypesFetch(),
			SitesService.siteNotificationUsersFetch(siteId)
		])
			.then(async (res) => {
				// deserialize responses
				const types: SSContentNotificationTypeInterface[] = await deserializeSite(res[0]);
				const users: SSContentNotificationUsersInterface[] = await deserializeSite(res[1]);

				// map types and users
				const result = users.map((item) => {
					const type = types.find((type) => type.id === item.notificationType.id);
					return {
						id: item.id,
						isActive: item.isActive,
						users: item.users.map((u) => u.email),
						typeId: type?.id,
						typeName: type?.name
					};
				});

				// dispatch: success
				dispatch(
					success({
						...state,
						response: {
							data: result,
							types,
							site: { id: siteId }
						}
					})
				);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'fetch-site-notification-types-users-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'COMMON.NOTIFICATIONS.FETCH.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure({ ...state, response: message }));
			});
	};

/**
 * update notification
 * @param payload
 * @param callback
 * @returns
 */
export const SiteNotificationUpdate =
	(payload: DialogCreateEditNotificationPayloadInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		// module
		const state = {
			module: SiteTypeEnum.NOTIFICATIONS
		};

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteNotificationUpdate(payload)
			.then(async () => {
				// wait
				await timeout(1000);

				// callback
				callback();

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'fetch-update-notification-users-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'COMMON.NOTIFICATIONS.UPDATE.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'fetch-update-notification-users-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'COMMON.NOTIFICATIONS.UPDATE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure({ ...state, response: message }));
			});
	};

/**
 * generate reports
 * @param id
 * @param siteId
 * @param payload
 * @param callback
 * @returns
 */
export const SiteReportsGenerate =
	(
		_id: ReportTypeEnum,
		siteId: string,
		payload: ReportPayloadInterface,
		callback: (report: string) => void
	) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: SiteTypeEnum.REPORTS
		};

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteReportsGenerate(siteId, payload)
			.then(async (res) => {
				// callback
				callback(res);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `site-generate-reports-success`,
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
					id: `site-generate-reports-success`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `COMMON.REPORTS.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};
