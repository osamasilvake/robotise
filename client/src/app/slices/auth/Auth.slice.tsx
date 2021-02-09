import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { AuthUserDetailInterface } from '../../screens/authentication/Auth.interface';
import AuthService from '../../screens/authentication/Auth.service';
import { RootState } from '..';
import { AuthInterface } from './Auth.interface';

// initial state
export const initialState: AuthInterface = {
	loading: false,
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
export const { authLoading, authSuccess, authFailure } = dataSlice.actions;

// selector
export const authSelector = (state: RootState) => state['auth'];

// reducer
export default dataSlice.reducer;

/**
 * validate authentication
 */
export const validateLogin = () => async (dispatch: Dispatch) => {
	// dispatch: start fetch process
	dispatch(authLoading());

	setTimeout(() => {
		const accessToken = AuthService.getAccessToken();
		if (accessToken) {
			if (AuthService.isAuthTokenValid(accessToken)) {
				const userInfo: AuthUserDetailInterface = AuthService.getUserDetail(accessToken);

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
	}, 6000);
};
