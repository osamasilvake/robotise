import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { AuthLoginFormInterface } from '../../screens/authentication/Auth.interface';
import AuthService from '../../screens/authentication/Auth.service';
import { AppConfigService, StorageService } from '../../services';
import { StorageTypeEnum } from '../../services/storage/Storage.enum';
import { dateAdd } from '../../utilities/methods/Date';
import { RootState } from '..';
import { triggerMessage } from '../app/App.slice';
import { AuthUserInterface, SliceAuthInterface } from './Auth.slice.interface';
import { mapUserDetail } from './Auth.slice.map';

// storage items
const token = AuthService.getAccessToken();
let user = null;
if (token) {
	// set user
	user = { ...mapUserDetail(token), expires_in: AuthService.getAccessTokenExpiry() };

	// set authorization to headers
	AuthService.setAuthorizationToHeaders(token);
}

// initial state
export const initialState: SliceAuthInterface = {
	loader: false,
	loading: false,
	user
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
		},
		failure: (state) => {
			state.loader = false;
			state.loading = false;
			state.user = null;
		},
		terminate: (state) => {
			state.loader = false;
			state.loading = false;
			state.user = null;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, terminate, reset } = dataSlice.actions;

// selector
export const authSelector = (state: RootState) => state['auth'];

// reducer
export default dataSlice.reducer;

/**
 * login
 * @param payload
 */
export const AuthLogin = (payload: AuthLoginFormInterface) => async (dispatch: Dispatch) => {
	// dispatch: loading
	dispatch(loading());

	return AuthService.authLogin(payload)
		.then((res) => {
			// set token
			AuthService.setAccessToken(
				res.access_token,
				payload.rememberMe ? StorageTypeEnum.PERSISTENT : StorageTypeEnum.SESSION
			);

			// expires in: (minutes - 30 secs)
			const expiresIn = dateAdd(res.expires_in - 30, 's').valueOf();

			// set token expiry
			StorageService.put(
				AppConfigService.StorageItems.JWTAccessTokenExpiry,
				expiresIn,
				payload.rememberMe ? StorageTypeEnum.PERSISTENT : StorageTypeEnum.SESSION
			);

			// parse and map user info from access token
			const user: AuthUserInterface = mapUserDetail(res.access_token);

			// dispatch: success
			dispatch(success({ ...user, expires_in: expiresIn }));
		})
		.catch((err) => {
			const errMessage = err && (err.error_description || err.message);

			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'auth-login-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: errMessage || 'AUTH.UNKNOWN',
				dynamicText: !!errMessage
			};
			dispatch(triggerMessage(message));

			// dispatch: failure
			dispatch(failure());
		});
};

/**
 * requests a new token before it expires
 * @param expIn
 */
export const AuthRefreshToken = (expIn: number) => async (dispatch: Dispatch) => {
	const accessToken = AuthService.getAccessToken();
	if (accessToken) {
		// return on valid
		if (AuthService.authTokenValid(expIn)) return;

		// request new token
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

				// expires in: (minutes - 30 secs)
				const expiresIn = dateAdd(res.expires_in - 30, 's').valueOf();

				// set token expiry
				StorageService.put(
					AppConfigService.StorageItems.JWTAccessTokenExpiry,
					expiresIn,
					isLocal ? StorageTypeEnum.PERSISTENT : StorageTypeEnum.SESSION
				);

				// parse and map user info from access token
				const user: AuthUserInterface = mapUserDetail(res.access_token);

				// dispatch: success
				dispatch(success({ ...user, expires_in: expiresIn }));
			})
			.catch((err) => {
				const errMessage = err && err.error_description;

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'auto-token-refresh-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: errMessage,
					dynamicText: !!errMessage
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure());

				// clear authentication
				AuthService.authLogout();

				// dispatch: terminate
				dispatch(terminate());
			});
	} else {
		// dispatch: trigger message
		const message: TriggerMessageInterface = {
			id: 'auth-token-empty-warn',
			show: true,
			severity: TriggerMessageTypeEnum.WARNING,
			text: 'AUTH.TOKEN_EMPTY'
		};
		dispatch(triggerMessage(message));

		// dispatch: failure
		dispatch(failure());
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
