import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { DialogCleanTestOrdersFormInterface } from '../../../screens/business/sites/content/configuration/clean-test-orders/SiteCleanTestOrders.interface';
import { SiteConfigFormInterface } from '../../../screens/business/sites/content/configuration/site-config/SiteConfig.interface';
import { SiteRobotConfigFormInterface } from '../../../screens/business/sites/content/configuration/site-robot-config/SiteRobotConfig.interface';
import SitesService from '../../../screens/business/sites/Sites.service';
import { timeout } from '../../../utilities/methods/Timeout';
import { AppReducerType } from '../..';
import { triggerMessage } from '../../app/App.slice';
import { SiteOperationsTypeEnum } from './SiteOperations.slice.enum';
import { SliceSiteOperationsInterface } from './SiteOperations.slice.interface';

// initial state
export const initialState: SliceSiteOperationsInterface = {
	acceptOrders: {
		loading: false
	},
	siteRobotConfig: {
		loading: false
	},
	siteConfig: {
		loading: false
	},
	cleanTestOrders: {
		loading: false
	}
};

// slice
const dataSlice = createSlice({
	name: 'Site Operations',
	initialState,
	reducers: {
		loading: (state, action) => {
			const { module } = action.payload;
			if (module === SiteOperationsTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = true;
			} else if (module === SiteOperationsTypeEnum.SITE_ROBOT_CONFIG) {
				state.siteRobotConfig.loading = true;
			} else if (module === SiteOperationsTypeEnum.SITE_CONFIG) {
				state.siteConfig.loading = true;
			} else if (module === SiteOperationsTypeEnum.CLEAN_TEST_ORDERS) {
				state.cleanTestOrders.loading = true;
			}
		},
		success: (state, action) => {
			const { module } = action.payload;
			if (module === SiteOperationsTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = false;
			} else if (module === SiteOperationsTypeEnum.SITE_ROBOT_CONFIG) {
				state.siteRobotConfig.loading = false;
			} else if (module === SiteOperationsTypeEnum.SITE_CONFIG) {
				state.siteConfig.loading = false;
			} else if (module === SiteOperationsTypeEnum.CLEAN_TEST_ORDERS) {
				state.cleanTestOrders.loading = false;
			}
		},
		failure: (state, action) => {
			const { module } = action.payload;
			if (module === SiteOperationsTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = false;
			} else if (module === SiteOperationsTypeEnum.SITE_ROBOT_CONFIG) {
				state.siteRobotConfig.loading = false;
			} else if (module === SiteOperationsTypeEnum.SITE_CONFIG) {
				state.siteConfig.loading = false;
			} else if (module === SiteOperationsTypeEnum.CLEAN_TEST_ORDERS) {
				state.cleanTestOrders.loading = false;
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const siteOperationsSelector = (state: AppReducerType) => state['siteOperations'];

// reducer
export default dataSlice.reducer;

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
			module: SiteOperationsTypeEnum.ACCEPT_ORDERS
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
					id: 'site-accept-orders-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.CONFIGURATION.ACCEPT_ORDERS.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'site-accept-orders-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.ACCEPT_ORDERS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * update site robot config
 * @param siteId
 * @param payload
 * @returns
 */
export const SiteRobotConfigUpdate =
	(siteId: string, payload: SiteRobotConfigFormInterface) => async (dispatch: Dispatch) => {
		const state = {
			module: SiteOperationsTypeEnum.SITE_ROBOT_CONFIG
		};

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteRobotConfigUpdate(siteId, payload)
			.then(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'site-robot-config-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.CONFIGURATION.SITE_ROBOT_CONFIG.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'site-robot-config-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.SITE_ROBOT_CONFIG.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * update site config
 * @param siteId
 * @param payload
 * @param callback
 * @returns
 */
export const SiteConfigUpdate =
	(siteId: string, payload: SiteConfigFormInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: SiteOperationsTypeEnum.SITE_CONFIG
		};

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteConfigUpdate(siteId, payload)
			.then(async () => {
				// callback
				callback();

				// wait
				await timeout(1000);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'site-config-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.CONFIGURATION.SITE_CONFIG.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'site-config-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.SITE_CONFIG.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * clean test orders
 * @param siteId
 * @param payload
 * @returns
 */
export const SiteTestOrdersClean =
	(siteId: string, payload: DialogCleanTestOrdersFormInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: SiteOperationsTypeEnum.CLEAN_TEST_ORDERS
		};

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteTestOrdersClean(siteId, payload)
			.then(() => {
				// callback
				callback();

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'site-clean-test-orders-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.CONFIGURATION.CLEAN_TEST_ORDERS.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'site-clean-test-orders-success',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.CLEAN_TEST_ORDERS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};
