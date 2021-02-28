import { createSlice, Dispatch } from '@reduxjs/toolkit';

import {
	AuthLoginInterface,
	AuthUserDetailInterface
} from '../../screens/authentication/Auth.interface';
import AuthService from '../../screens/authentication/Auth.service';
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
 * validate authentication
 */
export const AuthValidateLogin = () => async (dispatch: Dispatch) => {
	// dispatch: loader
	dispatch(authLoading());

	setTimeout(() => {
		const accessToken = AuthService.getAccessToken();
		if (accessToken) {
			if (AuthService.authTokenValid(accessToken)) {
				const userInfo: AuthUserDetailInterface = AuthService.authUserDetail(accessToken);

				// dispatch: response
				dispatch(authSuccess(userInfo));
			} else {
				// dispatch: error
				dispatch(
					authFailure({
						status: 400,
						msg: 'Token Got Expired!'
					})
				);
			}
		} else {
			// dispatch: error
			dispatch(
				authFailure({
					status: 400,
					msg: 'No Token Found!'
				})
			);
		}
	}, 1000);
};

/**
 * login
 * @param payload
 */
export const AuthLogin = (payload: AuthLoginInterface) => async (dispatch: Dispatch) => {
	AuthService.authLogin(payload)
		.then((res) => {
			AuthService.setAccessToken(res.access_token);
			const user = AuthService.authUserDetail(res.access_token);
			dispatch(authSuccess(user));
		})
		.catch((err) => {
			dispatch(authFailure(err));
		});
};

/**
 * logout
 */
export const AuthLogout = () => async (dispatch: Dispatch) => {
	// dispatch: loader
	dispatch(authLoading());

	setTimeout(() => {
		const accessToken = AuthService.getAccessToken();
		if (accessToken) {
			AuthService.authLogout();
		}

		// dispatch: reset
		dispatch(resetState());
	}, 1000);
};
