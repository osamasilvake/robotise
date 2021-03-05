import { createSlice, Dispatch } from '@reduxjs/toolkit';
import moment from 'moment';

import { TriggerMessageEnum } from '../../frame/message/Message.interface';
import {
	AuthLoginInterface,
	AuthUserDetailInterface
} from '../../screens/authentication/Auth.interface';
import AuthService from '../../screens/authentication/Auth.service';
import { ConfigService, StorageService } from '../../services';
import { StorageTypeEnum } from '../../services/services.enum';
import { TriggerMessageInterface } from '../general/General.interface';
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
		authLoading: (state) => {
			state.loading = true;
		},
		authSuccess: (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.errors = null;
		},
		authFailure: (state, action) => {
			state.loading = false;
			state.user = null;
			state.errors = action.payload;
		},
		resetState: () => initialState
	}
});

// actions
export const { authLoading, authSuccess, authFailure, resetState } = dataSlice.actions;

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
			dispatch(authSuccess(user));
		})
		.catch((err) => {
			const message: TriggerMessageInterface = {
				show: true,
				severity: TriggerMessageEnum.ERROR,
				text: err.message
			};

			// dispatch: error
			dispatch(authFailure(message));

			// dispatch: trigger message
			dispatch(triggerMessage(message));
		});
};

/**
 * requests a new token 30 seconds before it expires
 * @param expDate
 */
export const AuthRefreshToken = (expDate: number) => async (dispatch: Dispatch) => {
	const accessToken = AuthService.getAccessToken();
	if (accessToken) {
		if (AuthService.authTokenValid(accessToken)) {
			const expiresInMs = expDate * 1000 - moment().valueOf();
			if (expiresInMs < 30000) {
				AuthService.authRequestNewToken()
					.then((res) => {
						// local-storage
						const isLocal = StorageService.get(
							ConfigService.AppLocalStorageItems.JWTAccessToken,
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
						dispatch(authSuccess(user));
					})
					.catch((err) => {
						const message: TriggerMessageInterface = {
							show: true,
							severity: TriggerMessageEnum.ERROR,
							text: err.error_description
						};

						// dispatch: failure
						dispatch(authFailure(message));

						// dispatch: trigger message
						dispatch(triggerMessage(message));
					});
			}
		} else {
			const message: TriggerMessageInterface = {
				show: true,
				severity: TriggerMessageEnum.ERROR,
				text: 'AUTH.LOGIN.ERRORS.TOKEN_EXPIRED'
			};

			// dispatch: error
			dispatch(authFailure(message));

			// dispatch: trigger message
			dispatch(triggerMessage(message));

			// clear authentication
			AuthService.authLogout();
		}
	} else {
		const message: TriggerMessageInterface = {
			show: true,
			severity: TriggerMessageEnum.WARNING,
			text: 'AUTH.LOGIN.ERRORS.TOKEN_EMPTY'
		};

		// dispatch: error
		dispatch(authFailure(message));
	}
};

/**
 * logout
 */
export const AuthLogout = () => async (dispatch: Dispatch) => {
	// dispatch: loader
	dispatch(authLoading());

	// clear authentication
	AuthService.authLogout();

	// dispatch: failure
	dispatch(authFailure(null));
};
