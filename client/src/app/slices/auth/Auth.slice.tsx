import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageEnum } from '../../frame/message/Message.interface';
import {
	AuthLoginInterface,
	AuthUserDetailInterface
} from '../../screens/authentication/Auth.interface';
import AuthService from '../../screens/authentication/Auth.service';
import { StorageTypeEnum } from '../../services/services.enum';
import { TriggerMessageInterface } from '../general/General.interface';
import { triggerMessage } from '../general/General.slice';
import { RootStateInterface } from '../Slices.interface';
import { AuthSliceInterface } from './Auth.interface';

// initial state
export const initialState: AuthSliceInterface = {
	loading: true,
	user: null,
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
			const err: TriggerMessageInterface = {
				severity: TriggerMessageEnum.ERROR,
				text: 'GLOBAL.AUTH.LOGIN.ERRORS.TOKEN_EXPIRED'
			};

			// dispatch: error
			dispatch(authFailure(err));

			// dispatch: trigger message
			dispatch(triggerMessage(err));

			// clear authentication
			AuthService.authLogout();
		}
	} else {
		const err: TriggerMessageInterface = {
			severity: TriggerMessageEnum.WARNING,
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
			AuthService.setAccessToken(
				res.access_token,
				payload.rememberMe ? StorageTypeEnum.PERSISTANT : StorageTypeEnum.SESSION
			);

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

	// clear authentication
	AuthService.authLogout();

	// dispatch: failure
	dispatch(authFailure(null));
};
