import { createSlice, Dispatch } from '@reduxjs/toolkit';
import moment from 'moment';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import {
	AuthLoginInterface,
	AuthUserDetailInterface
} from '../../screens/authentication/Auth.interface';
import AuthService from '../../screens/authentication/Auth.service';
import { AppConfigService, StorageService } from '../../services';
import { StorageTypeEnum } from '../../services/storage/Storage.enum';
import { triggerMessage } from '../general/General.slice';
import { RootStateInterface } from '../Slices.interface';
import { AuthSliceInterface } from './Auth.interface';

// storage items
const user = AuthService.getAccessToken()
	? AuthService.authUserDetail(AuthService.getAccessToken())
	: null;

// initial state
export const initialState: AuthSliceInterface = {
	loading: false,
	user,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Auth',
	initialState,
	reducers: {
		loading: (state) => {
			state.loading = true;
		},
		success: (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.loading = false;
			state.user = null;
			state.errors = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const authSelector = (state: RootStateInterface) => state['auth'];

// reducer
export default dataSlice.reducer;

/**
 * login
 * @param payload
 */
export const AuthLogin = (payload: AuthLoginInterface) => async (dispatch: Dispatch) => {
	AuthService.authLogin(payload)
		.then((res) => {
			// set token
			AuthService.setAccessToken(
				res.access_token,
				payload.rememberMe ? StorageTypeEnum.PERSISTANT : StorageTypeEnum.SESSION
			);

			// decode user detail from access token
			const user: AuthUserDetailInterface = AuthService.authUserDetail(res.access_token);

			// dispatch: response
			dispatch(success(user));
		})
		.catch((err) => {
			const message: TriggerMessageInterface = {
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: err.error_description
			};

			// dispatch: error
			dispatch(failure(message));

			// dispatch: trigger message
			dispatch(triggerMessage(message));
		});
};

/**
 * requests a new token before it expires
 * @param expDate
 */
export const AuthRefreshToken = (expDate: number) => async (dispatch: Dispatch) => {
	const accessToken = AuthService.getAccessToken();
	if (accessToken) {
		if (AuthService.authTokenValid(accessToken)) {
			const expiresInMs = expDate * 1000 - moment().valueOf();
			if (expiresInMs < AppConfigService.AppOptions.authentication.validateBefore) {
				AuthService.authRequestNewToken()
					.then((res) => {
						// local-storage
						const isLocal = StorageService.get(
							AppConfigService.AppLocalStorageItems.JWTAccessToken,
							StorageTypeEnum.PERSISTANT
						);

						// set token
						AuthService.setAccessToken(
							res.access_token,
							isLocal ? StorageTypeEnum.PERSISTANT : StorageTypeEnum.SESSION
						);

						// decode user detail from access token
						const user: AuthUserDetailInterface = AuthService.authUserDetail(
							res.access_token
						);

						// dispatch: response
						dispatch(success(user));
					})
					.catch((err) => {
						const message: TriggerMessageInterface = {
							show: true,
							severity: TriggerMessageTypeEnum.ERROR,
							text: err.error_description
						};

						// dispatch: failure
						dispatch(failure(message));

						// dispatch: trigger message
						dispatch(triggerMessage(message));
					});
			}
		} else {
			const message: TriggerMessageInterface = {
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'AUTH.LOGIN.ERRORS.TOKEN_EXPIRED'
			};

			// dispatch: error
			dispatch(failure(message));

			// dispatch: trigger message
			dispatch(triggerMessage(message));

			// clear authentication
			AuthService.authLogout();
		}
	} else {
		const message: TriggerMessageInterface = {
			show: true,
			severity: TriggerMessageTypeEnum.WARNING,
			text: 'AUTH.LOGIN.ERRORS.TOKEN_EMPTY'
		};

		// dispatch: error
		dispatch(failure(message));
	}
};

/**
 * logout
 */
export const AuthLogout = () => async (dispatch: Dispatch) => {
	// dispatch: loader
	dispatch(loading());

	// clear authentication
	AuthService.authLogout();

	// dispatch: failure
	dispatch(failure(null));
};
