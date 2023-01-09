import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';
import { DialogCleanTestOrdersFormInterface } from '../../../../../screens/business/sites/content/configuration/cloud/clean-test-orders/SiteConfigurationCleanTestOrders.interface';
import { SiteConfigurationPaymentSettingsFormInterface } from '../../../../../screens/business/sites/content/configuration/cloud/payment-settings/SiteConfigurationPaymentSettings.interface';
import { SiteConfigFormInterface } from '../../../../../screens/business/sites/content/configuration/cloud/site-config/SiteConfig.interface';
import { SiteRobotConfigFormInterface } from '../../../../../screens/business/sites/content/configuration/cloud/site-robot-config/SiteRobotConfig.interface';
import SitesService from '../../../../../screens/business/sites/Sites.service';
import { timeout } from '../../../../../utilities/methods/Timeout';
import { RootState } from '../../../..';
import { triggerMessage } from '../../../../app/App.slice';
import { deserializeSiteCloudConfiguration } from './SiteCloudConfiguration.slice.deserialize';
import { SiteCloudConfigurationTypeEnum } from './SiteCloudConfiguration.slice.enum';
import { SliceSiteCloudConfigurationInterface } from './SiteCloudConfiguration.slice.interface';

// initial state
export const initialState: SliceSiteCloudConfigurationInterface = {
	acceptOrders: {
		loading: false
	},
	siteRobotConfig: {
		loading: false
	},
	siteConfig: {
		loading: false
	},
	orderOrigins: {
		loading: false,
		content: null
	},
	customerNotificationTypes: {
		loading: false,
		content: null
	},
	helpPages: {
		loading: false,
		content: null
	},
	elevatorVendors: {
		loading: false,
		content: null
	},
	paymentSettings: {
		loading: false
	},
	cleanTestOrders: {
		loading: false
	}
};

// slice
const dataSlice = createSlice({
	name: 'Site Cloud Configuration',
	initialState,
	reducers: {
		loading: (state, action) => {
			const { module } = action.payload;
			if (module === SiteCloudConfigurationTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = true;
			} else if (module === SiteCloudConfigurationTypeEnum.SITE_ROBOT_CONFIG) {
				state.siteRobotConfig.loading = true;
			} else if (module === SiteCloudConfigurationTypeEnum.SITE_CONFIG) {
				state.siteConfig.loading = true;
			} else if (module === SiteCloudConfigurationTypeEnum.ORDER_ORIGINS) {
				state.orderOrigins.loading = true;
			} else if (module === SiteCloudConfigurationTypeEnum.CUSTOMER_NOTIFICATION_TYPES) {
				state.customerNotificationTypes.loading = true;
			} else if (module === SiteCloudConfigurationTypeEnum.HELP_PAGES) {
				state.helpPages.loading = true;
			} else if (module === SiteCloudConfigurationTypeEnum.ELEVATOR_VENDORS) {
				state.elevatorVendors.loading = true;
			} else if (module === SiteCloudConfigurationTypeEnum.PAYMENT_SETTINGS) {
				state.paymentSettings.loading = true;
			} else if (module === SiteCloudConfigurationTypeEnum.CLEAN_TEST_ORDERS) {
				state.cleanTestOrders.loading = true;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === SiteCloudConfigurationTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = false;
			} else if (module === SiteCloudConfigurationTypeEnum.SITE_ROBOT_CONFIG) {
				state.siteRobotConfig.loading = false;
			} else if (module === SiteCloudConfigurationTypeEnum.SITE_CONFIG) {
				state.siteConfig.loading = false;
			} else if (module === SiteCloudConfigurationTypeEnum.ORDER_ORIGINS) {
				state.orderOrigins.loading = false;
				state.orderOrigins.content = response;
			} else if (module === SiteCloudConfigurationTypeEnum.CUSTOMER_NOTIFICATION_TYPES) {
				state.customerNotificationTypes.loading = false;
				state.customerNotificationTypes.content = response;
			} else if (module === SiteCloudConfigurationTypeEnum.HELP_PAGES) {
				state.helpPages.loading = false;
				state.helpPages.content = response;
			} else if (module === SiteCloudConfigurationTypeEnum.ELEVATOR_VENDORS) {
				state.elevatorVendors.loading = false;
				state.elevatorVendors.content = response;
			} else if (module === SiteCloudConfigurationTypeEnum.PAYMENT_SETTINGS) {
				state.paymentSettings.loading = false;
			} else if (module === SiteCloudConfigurationTypeEnum.CLEAN_TEST_ORDERS) {
				state.cleanTestOrders.loading = false;
			}
		},
		failure: (state, action) => {
			const { module } = action.payload;
			if (module === SiteCloudConfigurationTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = false;
			} else if (module === SiteCloudConfigurationTypeEnum.SITE_ROBOT_CONFIG) {
				state.siteRobotConfig.loading = false;
			} else if (module === SiteCloudConfigurationTypeEnum.SITE_CONFIG) {
				state.siteConfig.loading = false;
			} else if (module === SiteCloudConfigurationTypeEnum.ORDER_ORIGINS) {
				state.orderOrigins.loading = false;
				state.orderOrigins.content = null;
			} else if (module === SiteCloudConfigurationTypeEnum.CUSTOMER_NOTIFICATION_TYPES) {
				state.customerNotificationTypes.loading = false;
				state.customerNotificationTypes.content = null;
			} else if (module === SiteCloudConfigurationTypeEnum.HELP_PAGES) {
				state.helpPages.loading = false;
				state.helpPages.content = null;
			} else if (module === SiteCloudConfigurationTypeEnum.ELEVATOR_VENDORS) {
				state.elevatorVendors.loading = false;
				state.elevatorVendors.content = null;
			} else if (module === SiteCloudConfigurationTypeEnum.PAYMENT_SETTINGS) {
				state.paymentSettings.loading = false;
			} else if (module === SiteCloudConfigurationTypeEnum.CLEAN_TEST_ORDERS) {
				state.cleanTestOrders.loading = false;
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const siteCloudConfigurationSelector = (state: RootState) => state['siteCloudConfiguration'];

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
			module: SiteCloudConfigurationTypeEnum.ACCEPT_ORDERS
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
					id: 'configuration-accept-orders-success',
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
					id: 'configuration-accept-orders-error',
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
			module: SiteCloudConfigurationTypeEnum.SITE_ROBOT_CONFIG
		};

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteRobotConfigUpdate(siteId, payload)
			.then(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'configuration-robot-config-success',
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
					id: 'configuration-robot-config-error',
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
			module: SiteCloudConfigurationTypeEnum.SITE_CONFIG
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
					id: 'configuration-config-success',
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
					id: 'configuration-config-error',
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
 * fetch order origins
 * @returns
 */
export const SiteOrderOriginsFetch =
	() => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const orderOrigins = states.siteCloudConfiguration.orderOrigins;
		const state = {
			module: SiteCloudConfigurationTypeEnum.ORDER_ORIGINS
		};

		// return on busy
		if (orderOrigins && orderOrigins.loading) {
			return;
		}

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteOrderOriginsFetch()
			.then(async (res) => {
				// deserialize response
				const result = await deserializeSiteCloudConfiguration(res);

				// dispatch: success
				dispatch(success({ ...state, response: result }));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'configuration-order-origins-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.ORDER_ORIGINS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch customer notification types
 * @returns
 */
export const SiteCustomerNotificationTypesFetch =
	() => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const customerNotificationTypes = states.siteCloudConfiguration.customerNotificationTypes;
		const state = {
			module: SiteCloudConfigurationTypeEnum.CUSTOMER_NOTIFICATION_TYPES
		};

		// return on busy
		if (customerNotificationTypes && customerNotificationTypes.loading) {
			return;
		}

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteCustomerNotificationTypesFetch()
			.then(async (res) => {
				// deserialize response
				const result = await deserializeSiteCloudConfiguration(res);

				// dispatch: success
				dispatch(success({ ...state, response: result }));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'configuration-customer-notification-types-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.CUSTOMER_NOTIFICATION_TYPES.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * fetch help pages
 * @returns
 */
export const SiteHelpPagesFetch = () => async (dispatch: Dispatch, getState: () => RootState) => {
	// states
	const states = getState();
	const helpPages = states.siteCloudConfiguration.helpPages;
	const state = {
		module: SiteCloudConfigurationTypeEnum.HELP_PAGES
	};

	// return on busy
	if (helpPages && helpPages.loading) {
		return;
	}

	// dispatch: loading
	dispatch(loading(state));

	return SitesService.siteHelpPagesFetch()
		.then(async (res) => {
			// deserialize response
			const result = await deserializeSiteCloudConfiguration(res);

			// dispatch: success
			dispatch(success({ ...state, response: result }));
		})
		.catch(() => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'configuration-help-pages-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'SITES.CONFIGURATION.HELP_PAGES.ERROR'
			};
			dispatch(triggerMessage(message));

			// dispatch: failure
			dispatch(failure(state));
		});
};

/**
 * fetch elevator vendors
 * @returns
 */
export const SiteElevatorVendorsFetch =
	() => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const elevatorVendors = states.siteCloudConfiguration.elevatorVendors;
		const state = {
			module: SiteCloudConfigurationTypeEnum.ELEVATOR_VENDORS
		};

		// return on busy
		if (elevatorVendors && elevatorVendors.loading) {
			return;
		}

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteElevatorVendorsFetch()
			.then(async (res) => {
				// deserialize response
				const result = await deserializeSiteCloudConfiguration(res);

				// dispatch: success
				dispatch(success({ ...state, response: result }));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'configuration-elevator-vendors-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.ELEVATOR_VENDORS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};

/**
 * update payment settings
 * @param siteId
 * @param payload
 * @param callback
 * @returns
 */
export const SitePaymentSettingsUpdate =
	(
		siteId: string,
		payload: SiteConfigurationPaymentSettingsFormInterface,
		callback: () => void
	) =>
	async (dispatch: Dispatch) => {
		const state = {
			module: SiteCloudConfigurationTypeEnum.PAYMENT_SETTINGS
		};

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.sitePaymentSettingsUpdate(siteId, payload)
			.then(async () => {
				// callback
				callback();

				// wait
				await timeout(1000);

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'configuration-payment-settings-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.CONFIGURATION.PAYMENT_SETTINGS.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'configuration-payment-settings-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.PAYMENT_SETTINGS.ERROR'
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
			module: SiteCloudConfigurationTypeEnum.CLEAN_TEST_ORDERS
		};

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteTestOrdersClean(siteId, payload)
			.then(() => {
				// callback
				callback();

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'configuration-clean-test-orders-success',
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
					id: 'configuration-clean-test-orders-success',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.CLEAN_TEST_ORDERS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
			});
	};
