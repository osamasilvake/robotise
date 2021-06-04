import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import SitesService from '../../screens/business/sites/Sites.service';
import { timeout } from '../../utilities/methods/Timeout';
import { deserializeSite } from '../../utilities/serializers/json-api/Site.deserialize';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
import { SiteTypeEnum } from './Site.slice.enum';
import { SliceSiteInterface } from './Site.slice.interface';

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
	}
};

// slice
const dataSlice = createSlice({
	name: 'Site',
	initialState,
	reducers: {
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
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

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
 * accept orders
 * @param siteId
 * @param acceptOrders
 * @returns
 */
export const SiteAcceptOrders =
	(siteId: string, acceptOrders: boolean) => async (dispatch: Dispatch) => {
		const state = {
			module: SiteTypeEnum.ACCEPT_ORDERS
		};

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteAcceptOrders(siteId, acceptOrders)
			.then(async (res) => {
				// deserialize response
				const result = await deserializeSite(res);

				// wait
				await timeout(3000);

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
