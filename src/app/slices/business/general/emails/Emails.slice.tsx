import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { GeneralEmailsListPayloadInterface } from '../../../../screens/business/general/emails/list/GeneralEmailsList.interface';
import GeneralService from '../../../../screens/business/general/General.service';
import { AppReducerType } from '../../..';
import { deserializeEmails } from './Emails.deserialize';
import {
	SEContentInterface,
	SECStateInterface,
	SliceEmailsInterface
} from './Emails.slice.interface';

// initial state
export const initialState: SliceEmailsInterface = {
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Emails',
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
		updated: (state, action) => {
			state.updating = false;
			state.content = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, updating, updated, reset } = dataSlice.actions;

// selector
export const emailsSelector = (state: AppReducerType) => state['emails'];

// reducer
export default dataSlice.reducer;

/**
 * fetch emails
 * @param payload
 * @param refresh
 * @returns
 */
export const EmailsFetchList =
	(payload: GeneralEmailsListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const emails = states.emails;

		// return on busy
		if (emails && (emails.loader || emails.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch emails
		return GeneralService.generalEmailsFetch(payload)
			.then(async (res) => {
				// deserialize response
				let result: SEContentInterface = await deserializeEmails(res);

				// state
				result = {
					...result,
					state: payload
				};

				// handle refresh and pagination
				if (emails && emails.content) {
					result = handleRefreshAndPagination(
						emails.content,
						result,
						refresh,
						payload.rowsPerPage
					);
				}

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'fetch-emails-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * update state
 * @param state
 * @returns
 */
export const EmailsUpdateState =
	(state: SECStateInterface) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const emails = states.emails;

		// dispatch: updating
		dispatch(updating());

		if (emails && emails.content) {
			const result = {
				...emails.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};

/**
 * handle refresh and pagination
 * @param current
 * @param result
 * @param refresh
 * @param rowsPerPage
 * @returns
 */
const handleRefreshAndPagination = (
	current: SEContentInterface,
	result: SEContentInterface,
	refresh: boolean,
	rowsPerPage: number
) => {
	if (refresh) {
		const dataItems = current.data.slice(rowsPerPage);
		return {
			...current,
			data: [...result.data, ...dataItems],
			meta: current.meta && {
				...current.meta,
				totalDocs: result.meta.totalDocs,
				totalPages: result.meta.totalPages
			}
		};
	} else if (result?.meta?.page > 1) {
		return {
			...current,
			meta: {
				...current.meta,
				...result.meta
			},
			data: [...current.data, ...result.data]
		};
	}
	return result;
};
