import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import {
	AuthLoginPayloadInterface,
	AuthUserDetailInterface
} from '../../screens/authentication/Auth.interface';
import AuthService from '../../screens/authentication/Auth.service';
import { AppConfigService, StorageService } from '../../services';
import { StorageTypeEnum } from '../../services/storage/Storage.enum';
import { momentNow } from '../../utilities/methods/Moment';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
import { SliceAuthInterface } from './Auth.slice.interface';

// storage items
const user = AuthService.getAccessToken()
	? AuthService.authUserDetail(AuthService.getAccessToken())
	: null;
if (user) {
	// set authorization to headers
	AuthService.setAuthorizationToHeaders(AuthService.getAccessToken());
}

// initial state
export const initialState: SliceAuthInterface = {
	loader: false,
	loading: false,
	user,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Auth',
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
			state.user = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.loader = false;
			state.loading = false;
			state.user = null;
			state.errors = action.payload;
		},
		terminate: (state) => {
			state.loader = false;
			state.loading = false;
			state.user = null;
			state.errors = null;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, terminate, reset } = dataSlice.actions;

// selector
export const authSelector = (state: AppReducerType) => state['auth'];

// reducer
export default dataSlice.reducer;

/**
 * login
 * @param payload
 */
export const AuthLogin = (payload: AuthLoginPayloadInterface) => async (dispatch: Dispatch) => {
	// dispatch: loading
	dispatch(loading());

	return AuthService.authLogin(payload)
		.then((res) => {
			// set token
			AuthService.setAccessToken(
				res.access_token,
				payload.rememberMe ? StorageTypeEnum.PERSISTENT : StorageTypeEnum.SESSION
			);

			// decode user detail from access token
			const user: AuthUserDetailInterface = AuthService.authUserDetail(res.access_token);

			// dispatch: success
			dispatch(success(user));
		})
		.catch((err) => {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'login-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: (err && (err.error_description || err.message)) || 'AUTH.UNKNOWN'
			};
			dispatch(triggerMessage(message));

			// dispatch: failure
			dispatch(failure(message));
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
			const expiresInMs = expDate * 1000 - momentNow();
			if (
				expiresInMs <
				AppConfigService.AppOptions.screens.authentication.validateBeforeExpiry
			) {
				return AuthService.authRequestNewToken()
					.then((res) => {
						// local-storage
						const isLocal = StorageService.get(
							AppConfigService.StorageItems.JWTAccessToken,
							StorageTypeEnum.PERSISTENT
						);

						// set token
						AuthService.setAccessToken(
							res.access_token,
							isLocal ? StorageTypeEnum.PERSISTENT : StorageTypeEnum.SESSION
						);

						// decode user detail from access token
						const user: AuthUserDetailInterface = AuthService.authUserDetail(
							res.access_token
						);

						// dispatch: success
						dispatch(success(user));
					})
					.catch((err) => {
						// dispatch: trigger message
						const message: TriggerMessageInterface = {
							id: 'auto-refresh-error',
							show: true,
							severity: TriggerMessageTypeEnum.ERROR,
							text: err && err.error_description
						};
						dispatch(triggerMessage(message));

						// dispatch: failure
						dispatch(failure(message));
					});
			}
		} else {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'token-expired-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'AUTH.TOKEN_EXPIRED'
			};
			dispatch(triggerMessage(message));

			// dispatch: failure
			dispatch(failure(message));

			// clear authentication
			AuthService.authLogout();
		}
	} else {
		// dispatch: trigger message
		const message: TriggerMessageInterface = {
			id: 'token-empty-warn',
			show: true,
			severity: TriggerMessageTypeEnum.WARNING,
			text: 'AUTH.TOKEN_EMPTY'
		};

		// dispatch: failure
		dispatch(failure(message));
	}
};

/**
 * logout
 */
export const AuthLogout = () => async (dispatch: Dispatch) => {
	// dispatch: loader
	dispatch(loader());

	// clear authentication
	AuthService.authLogout();

	// dispatch: terminate
	dispatch(terminate());
};
