import { createSlice, Dispatch } from '@reduxjs/toolkit';

import {
	AuthLoginInterface,
	AuthUserDetailInterface
} from '../../screens/authentication/Auth.interface';
import AuthService from '../../screens/authentication/Auth.service';
import { PushMessageTypeEnum } from '../general/General.enum';
import { PushMessageInterface } from '../general/General.interface';
import { generalPushMessage } from '../general/General.slice';
import { RootStateInterface } from '../Slices.interface';
import { AuthSliceInterface } from './Auth.interface';

// initial state
export const initialState: AuthSliceInterface = {
	loading: true,
	response: null,
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
			state.response = action.payload;
			state.errors = null;
		},
		authFailure: (state, action) => {
			state.loading = false;
			state.response = null;
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
 * validate login
 */
export const AuthValidateLogin = () => async (dispatch: Dispatch) => {
	// dispatch: loader
	dispatch(authLoading());

	const accessToken = AuthService.getAccessToken();
	if (accessToken) {
		if (AuthService.authTokenValid(accessToken)) {
			const userInfo: AuthUserDetailInterface = AuthService.authUserDetail(accessToken);

			// dispatch: response
			dispatch(authSuccess(userInfo));
		} else {
			const err: PushMessageInterface = {
				severity: PushMessageTypeEnum.ERROR,
				text: 'GLOBAL.AUTH.LOGIN.ERRORS.TOKEN_EXPIRED'
			};

			// dispatch: error
			dispatch(authFailure(err));

			// dispatch: message
			dispatch(generalPushMessage(err));

			// remove token
			AuthService.removeAccessToken();
		}
	} else {
		const err: PushMessageInterface = {
			severity: PushMessageTypeEnum.ERROR,
			text: 'GLOBAL.AUTH.LOGIN.ERRORS.TOKEN_EMPTY'
		};

		// dispatch: error
		dispatch(authFailure(err));
	}
};

/**
 * login
 * @param payload
 */
export const AuthLogin = (payload: AuthLoginInterface) => async (dispatch: Dispatch) => {
	AuthService.authLogin(payload)
		.then((res) => {
			// set token
			AuthService.setAccessToken(res.access_token);

			// decode user detail from access token
			const user = AuthService.authUserDetail(res.access_token);

			// dispatch: response
			dispatch(authSuccess(user));
		})
		.catch((err) => {
			// dispatch: error
			dispatch(authFailure(err));
		});
};

/**
 * logout
 */
export const AuthLogout = () => async (dispatch: Dispatch) => {
	// dispatch: loader
	dispatch(authLoading());

	const accessToken = AuthService.getAccessToken();
	if (accessToken) {
		AuthService.authLogout();
	}

	// dispatch: reset
	dispatch(resetState());
};
