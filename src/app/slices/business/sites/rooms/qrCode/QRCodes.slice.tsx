import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';
import { DialogGenerateQRCodeFormInterface } from '../../../../../screens/business/sites/content/rooms/list/grid/qr-code/SiteRoomsQRCodeTemplate.interface';
import SitesService from '../../../../../screens/business/sites/Sites.service';
import { timeout } from '../../../../../utilities/methods/Timeout';
import { RootState } from '../../../..';
import { triggerMessage } from '../../../../app/App.slice';
import { deserializeQRCode, deserializeQRCodes } from './QRCodes.slice.deserialize';
import {
	SliceQRCodesInterface,
	SQRContentInterface,
	SQRDataInterface
} from './QRCodes.slice.interface';

// initial state
export const initialState: SliceQRCodesInterface = {
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'QR Codes',
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
		failure: (state) => {
			state.loader = false;
			state.loading = false;
			state.content = null;
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
export const qrCodesSelector = (state: RootState) => state['qrCodes'];

// reducer
export default dataSlice.reducer;

/**
 * fetch QR codes
 * @param siteId
 * @param refresh
 * @returns
 */
export const QRCodesFetch =
	(siteId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const qrCodes = states.qrCodes;

		// return on busy
		if (qrCodes && (qrCodes.loader || qrCodes.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch
		return SitesService.siteQRCodesFetch(siteId)
			.then(async (res) => {
				// deserialize response
				const result: SQRContentInterface = await deserializeQRCodes(res);

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'qr-codes-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.QR_CODES.FETCH.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure());
			});
	};

/**
 * create QR code
 * @param siteId
 * @param payload
 * @param callback
 * @returns
 */
export const QRCodeCreate =
	(
		siteId: string,
		payload: DialogGenerateQRCodeFormInterface,
		callback: (data: SQRDataInterface) => void
	) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return SitesService.siteQRCodeCreate(siteId, payload)
			.then(async (res) => {
				const result: SQRDataInterface = await deserializeQRCode(res);

				// dispatch: updated
				dispatch(updated());

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'qr-codes-create-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.QR_CODES.CREATE.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// callback
				callback(result);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'qr-codes-create-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.QR_CODES.CREATE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * delete QR code
 * @param siteId
 * @param qrCode
 * @param callback
 * @returns
 */
export const QRCodeDelete =
	(siteId: string, qrCode: SQRDataInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return SitesService.siteQRCodeDelete(siteId, qrCode.id)
			.then(async () => {
				// wait
				await timeout(1000);

				// callback
				callback();

				// wait
				await timeout(2000);

				// dispatch: updated
				dispatch(updated());

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'qr-codes-delete-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.QR_CODES.DELETE.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'qr-codes-delete-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.QR_CODES.DELETE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};
