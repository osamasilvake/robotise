import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { DialogCreateEditNotificationFormInterface } from '../../../../screens/business/sites/content/configuration/notifications/SiteNotifications.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { timeout } from '../../../../utilities/methods/Timeout';
import { AppReducerType } from '../../..';
import { triggerMessage } from '../../../general/General.slice';
import { deserializeNotifications } from './Notifications.slice.deserialize';
import {
	SliceNotificationsInterface,
	SNContentNotificationTypeInterface,
	SNContentNotificationUsersInterface
} from './Notifications.slice.interface';

// initial state
export const initialState: SliceNotificationsInterface = {
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Notifications',
	initialState,
	reducers: {
		loader: (state) => {
			state.loader = true;
		},
		loading: (state) => {
			state.loading = true;
		},
		success: (state, action) => {
			state.loader = false;
			state.loading = false;
			state.content = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.loader = false;
			state.loading = false;
			state.content = null;
			state.errors = action.payload;
		},
		updating: (state) => {
			state.updating = true;
		},
		updated: (state) => {
			state.updating = false;
		},
		updateFailed: (state) => {
			state.updating = false;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, updating, updated, updateFailed, reset } =
	dataSlice.actions;

// selector
export const notificationsSelector = (state: AppReducerType) => state['notifications'];

// reducer
export default dataSlice.reducer;

/**
 * fetch site notification types and users
 * @param siteId
 * @param refresh
 * @returns
 */
export const NotificationTypesAndUsersFetchList =
	(siteId: string, refresh = false) =>
	async (dispatch: Dispatch) => {
		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return Promise.all([
			SitesService.siteNotificationTypesFetch(),
			SitesService.siteNotificationUsersFetch(siteId)
		])
			.then(async (res) => {
				// deserialize responses
				const types: SNContentNotificationTypeInterface[] = await deserializeNotifications(
					res[0]
				);
				const users: SNContentNotificationUsersInterface[] = await deserializeNotifications(
					res[1]
				);

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
						data: result,
						types,
						site: { id: siteId }
					})
				);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'notifications-types-users-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * update notification
 * @param payload
 * @param callback
 * @returns
 */
export const NotificationUpdate =
	(payload: DialogCreateEditNotificationFormInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return SitesService.siteNotificationUpdate(payload)
			.then(async () => {
				// wait
				await timeout(1000);

				// callback
				callback();

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'notifications-users-update-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.CONFIGURATION.NOTIFICATIONS.UPDATE.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: updated
				dispatch(updated());
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'notifications-users-update-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.NOTIFICATIONS.UPDATE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};
