import { createSlice } from '@reduxjs/toolkit';

// form interface
export interface AuthInterface {
	userState: {
		firstName: string;
		lastName: string;
		nickName: string;
		email: string;
		dateOfBirth: Date;
		password: string;
	} | null;
}

// initial state
export const initialState: AuthInterface = {
	userState: null
};

// slice
const dataSlice = createSlice({
	name: 'Auth',
	initialState,
	reducers: {
		setUserState: (state, action) => {
			state.userState = action.payload;
		},
		resetUserState: () => initialState
	}
});

// actions
export const { setUserState, resetUserState } = dataSlice.actions;

// reducer
export default dataSlice.reducer;
