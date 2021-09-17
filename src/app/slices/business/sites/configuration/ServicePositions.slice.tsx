import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SiteServicePositionsCreateEditTypeEnum } from '../../../../screens/business/sites/content/configuration/service-positions/SiteServicePositions.enum';
import { DialogCreateEditServicePositionFormInterface } from '../../../../screens/business/sites/content/configuration/service-positions/SiteServicePositions.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { timeout } from '../../../../utilities/methods/Timeout';
import { AppReducerType } from '../../..';
import { triggerMessage } from '../../../general/General.slice';
import { deserializeServicePositions } from './ServicePositions.deserialize';
import {
	SliceServicePositionsInterface,
	SSContentServicePositionDataInterface
} from './ServicePositions.slice.interface';

// initial state
export const initialState: SliceServicePositionsInterface = {
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Service Positions',
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
export const servicePositionsSelector = (state: AppReducerType) => state['servicePositions'];

// reducer
export default dataSlice.reducer;

/**
 * fetch service positions
 * @param siteId
 * @param refresh
 * @returns
 */
export const ServicePositionsFetch =
	(siteId: string, refresh = false) =>
	async (dispatch: Dispatch) => {
		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return SitesService.siteServicePositionsFetch(siteId)
			.then(async (res) => {
				// deserialize response
				const result = await deserializeServicePositions(res);

				// dispatch: success
				dispatch(
					success({
						...result,
						site: { id: siteId }
					})
				);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'fetch-service-positions-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.SERVICE_POSITIONS.FETCH.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * create/edit service position
 * @param siteId
 * @param payload
 * @param type
 * @param callback
 * @returns
 */
export const ServicePositionCreateEdit =
	(
		siteId: string,
		payload: DialogCreateEditServicePositionFormInterface,
		type: SiteServicePositionsCreateEditTypeEnum,
		callback: () => void
	) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return SitesService.siteServicePositionCreateEdit(siteId, payload, type)
			.then(async () => {
				// wait
				await timeout(1000);

				// callback
				callback();

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'create-edit-service-position-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text:
						type === SiteServicePositionsCreateEditTypeEnum.CREATE
							? 'SITES.CONFIGURATION.SERVICE_POSITIONS.CREATE.SUCCESS'
							: 'SITES.CONFIGURATION.SERVICE_POSITIONS.EDIT.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: updated
				dispatch(updated());
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'create-edit-service-position-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text:
						type === SiteServicePositionsCreateEditTypeEnum.CREATE
							? 'SITES.CONFIGURATION.SERVICE_POSITIONS.CREATE.ERROR'
							: 'SITES.CONFIGURATION.SERVICE_POSITIONS.EDIT.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: updateFailed
				dispatch(updateFailed());
			});
	};

/**
 * delete service position
 * @param servicePosition
 * @param callback
 * @returns
 */
export const SiteServicePositionDelete =
	(servicePosition: SSContentServicePositionDataInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return SitesService.siteServicePositionDelete(servicePosition.id)
			.then(async () => {
				// wait
				await timeout(1000);

				// callback
				callback();

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'delete-service-position-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.CONFIGURATION.SERVICE_POSITIONS.DELETE.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: updated
				dispatch(updated());
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'delete-service-position-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.SERVICE_POSITIONS.DELETE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: updateFailed
				dispatch(updateFailed());
			});
	};
