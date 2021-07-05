import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import SitesService from '../../screens/business/sites/Sites.service';
import { deserializeSite } from '../../utilities/serializers/json-api/Site.deserialize';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
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
		content: null,
		errors: null
	},
	acceptOrders: {
		loading: false,
		content: null,
		errors: null
	},
	notifications: {
		loader: false,
		loading: false,
		content: null,
		errors: null
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
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === SiteTypeEnum.SERVICE_POSITIONS) {
				state.servicePositions.loading = false;
				state.servicePositions.content = response;
				state.servicePositions.errors = null;
			} else if (module === SiteTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = false;
				state.acceptOrders.content = response;
				state.acceptOrders.errors = null;
			} else if (module === SiteTypeEnum.NOTIFICATIONS) {
				state.notifications.loader = false;
				state.notifications.content = response;
				state.notifications.errors = null;
			}
		},
		failure: (state, action) => {
			const { module, error } = action.payload;
			if (module === SiteTypeEnum.SERVICE_POSITIONS) {
				state.servicePositions.loading = false;
				state.servicePositions.content = null;
				state.servicePositions.errors = error;
			} else if (module === SiteTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = false;
				state.acceptOrders.content = null;
				state.acceptOrders.errors = error;
			} else if (module === SiteTypeEnum.NOTIFICATIONS) {
				state.notifications.loader = false;
				state.notifications.content = null;
				state.notifications.errors = error;
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
 * accept orders
 * @param siteId
 * @param acceptOrders
 * @param callback
 * @returns
 */
export const SiteAcceptOrders =
	(siteId: string, acceptOrders: boolean, callback: () => void) => async (dispatch: Dispatch) => {
		const state = {
			module: SiteTypeEnum.ACCEPT_ORDERS
		};

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteAcceptOrders(siteId, acceptOrders)
			.then(async (res) => {
				// deserialize response
				const result = await deserializeSite(res);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `site-accept-orders-success`,
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `SITES.CONFIGURATION.ACCEPT_ORDERS.SUCCESS`
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success({ ...state, response: result }));

				// callback
				callback();
			})
			.catch((err) => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `site-accept-orders-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `SITES.CONFIGURATION.ACCEPT_ORDERS.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure({ ...state, error: err }));
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
				const result = types.map((type) => {
					const filtered = users.filter((user) => user.notificationType.id === type.id);
					return {
						id: type.id,
						name: type.name,
						isActive: filtered.length && filtered[0].isActive,
						users: filtered.length && filtered[0].users.map((u) => u.email)
					};
				});

				// dispatch: success
				dispatch(success({ ...state, response: { data: result, site: { id: siteId } } }));
			})
			.catch((err) => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'fetch-site-notifications-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'COMMON.NOTIFICATIONS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure({ ...state, error: err }));
			});
	};
