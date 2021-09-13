import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { ReportTypeEnum } from '../../../components/common/report/Report.enum';
import { ReportFormInterface } from '../../../components/common/report/Report.interface';
import { TriggerMessageTypeEnum } from '../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { SiteRobotConfigFormInterface } from '../../../screens/business/sites/content/configuration/site-robot-config/SiteRobotConfig.interface';
import SitesService from '../../../screens/business/sites/Sites.service';
import { timeout } from '../../../utilities/methods/Timeout';
import { AppReducerType } from '../..';
import { triggerMessage } from '../../general/General.slice';
import { SiteTypeEnum } from './Site.slice.enum';
import { SliceSiteInterface } from './Site.slice.interface';

// initial state
export const initialState: SliceSiteInterface = {
	acceptOrders: {
		loading: false
	},
	siteRobotConfig: {
		loading: false
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
		loading: (state, action) => {
			const { module } = action.payload;
			if (module === SiteTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = true;
			} else if (module === SiteTypeEnum.SITE_ROBOT_CONFIG) {
				state.siteRobotConfig.loading = true;
			} else if (module === SiteTypeEnum.REPORTS) {
				state.reports.loading = true;
			}
		},
		success: (state, action) => {
			const { module } = action.payload;
			if (module === SiteTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = false;
			} else if (module === SiteTypeEnum.SITE_ROBOT_CONFIG) {
				state.siteRobotConfig.loading = false;
			} else if (module === SiteTypeEnum.REPORTS) {
				state.reports.loading = false;
			}
		},
		failure: (state, action) => {
			const { module } = action.payload;
			if (module === SiteTypeEnum.ACCEPT_ORDERS) {
				state.acceptOrders.loading = false;
			} else if (module === SiteTypeEnum.SITE_ROBOT_CONFIG) {
				state.siteRobotConfig.loading = false;
			} else if (module === SiteTypeEnum.REPORTS) {
				state.reports.loading = false;
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
 * update site robot config
 * @param siteId
 * @param payload
 * @returns
 */
export const SiteRobotConfigUpdate =
	(siteId: string, payload: SiteRobotConfigFormInterface) => async (dispatch: Dispatch) => {
		const state = {
			module: SiteTypeEnum.SITE_ROBOT_CONFIG
		};

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.siteRobotConfigUpdate(siteId, payload)
			.then(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `site-robot-config-success`,
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `SITES.CONFIGURATION.SITE_ROBOT_CONFIG.SUCCESS`
				};
				dispatch(triggerMessage(message));

				// dispatch: success
				dispatch(success(state));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `site-robot-config-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `SITES.CONFIGURATION.SITE_ROBOT_CONFIG.ERROR`
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(state));
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
		payload: ReportFormInterface,
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
