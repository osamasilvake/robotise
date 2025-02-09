import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { AuthLoginFormInterface } from '../../screens/authentication/Auth.interface';
import AuthService from '../../screens/authentication/Auth.service';
import { StorageTypeEnum } from '../../services/storage/Storage.enum';
import { RootState } from '..';
import { triggerMessage } from '../app/App.slice';
import {
	AuthLogin,
	AuthLogout,
	AuthRefreshToken,
	failure,
	initialState,
	loader,
	loading,
	success,
	terminate
} from './Auth.slice';
import { SliceAuthInterface } from './Auth.slice.interface';
import { mapUserDetail } from './Auth.slice.map';

// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// mock store
type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;
const mockStore = createMockStore<SliceAuthInterface, DispatchExts>([thunk]);

describe('[SLICE] Authentication', () => {
	const accessToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4MTI3NDIzNjcsImlhdCI6MTYxMjczMjA2NywianRpIjoiZGQxNGQyZGItMTZkZi00MGNlLTg4NWEtZjk0YjBlNDBlN2Q1IiwiaXNzIjoiaHR0cDovL2F1dGgucm9ib3Rpc2UuZXUvcmVhbG1zL3JvYy1zdGFnaW5nIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjMzZWY2NDMzLWY0MWUtNDE1Ny1hODhmLTI5OTI1ZTYzMTllYiIsInR5cCI6IkJlYXJlciIsImF6cCI6InJvYy1vcHMtYXBwIiwic2Vzc2lvbl9zdGF0ZSI6IjA4NGI2YTBkLTUzNDQtNGVkMi05NzQ1LTkwNWM0ZTY5ZjAzYyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJyb2Nfb3AiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3JkZXJzOnJlYWQgcm9ib3RzOndyaXRlIHJvYm90czpyZWFkIGVtYWlsIG9yZGVyczp3cml0ZSBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInVzZXJfaWQiOiIzM2VmNjQzMy1mNDFlLTQxNTctYTg4Zi0yOTkyNWU2MzE5ZWIiLCJuYW1lIjoiSW1yYW4gS2hhbiIsInByZWZlcnJlZF91c2VybmFtZSI6ImltcmFuLmtoYW5Acm9ib3Rpc2UuZXUiLCJnaXZlbl9uYW1lIjoiSW1yYW4iLCJmYW1pbHlfbmFtZSI6IktoYW4iLCJlbWFpbCI6ImltcmFuLmtoYW5Acm9ib3Rpc2UuZXUifQ.4Oqb3SCdDrWgQf4iHCuOHKbW4CT47jvpOBmdOYpFbOk';

	beforeEach(() => {
		// set access token
		AuthService.setAccessToken(accessToken, StorageTypeEnum.PERSISTENT);
	});

	afterEach(() => {
		// remove access token
		AuthService.removeAccessToken();
	});

	it('[AuthLogin] Creates loading and success actions when login succeeds', () => {
		const store = mockStore(initialState);
		const response = accessToken;
		const request: AuthLoginFormInterface = {
			email: 'fakeEmail@robotise.eu',
			password: 'fakePassword',
			rememberMe: true
		};

		// mock api once
		mockedAxios.post.mockResolvedValueOnce({
			data: {
				access_token: response
			}
		});

		// act
		store
			.dispatch(AuthLogin(request))
			.then(() => {
				// update expires in
				const user = { ...mapUserDetail(accessToken), expires_in: NaN };

				// assert
				const expectedActions = [loading(), success(user)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[AuthLogin] Creates loading and failure actions when login fails', () => {
		const store = mockStore(initialState);
		const request = {
			email: 'fakeEmail@robotise.eu',
			password: 'fakePassword'
		};

		// mock api once
		const response = new Error('invalid credentials');
		const message: TriggerMessageInterface = {
			id: 'auth-login-error',
			show: true,
			severity: TriggerMessageTypeEnum.ERROR,
			text: response.message,
			dynamicText: true
		};
		mockedAxios.post.mockRejectedValueOnce(response);

		// act
		store
			.dispatch(AuthLogin(request))
			.then(() => {
				// assert
				const expectedActions = [loading(), triggerMessage(message), failure()];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[AuthRefreshToken] Create failure action on empty access token', () => {
		const store = mockStore(initialState);
		const message: TriggerMessageInterface = {
			id: 'auth-token-empty-warn',
			show: true,
			severity: TriggerMessageTypeEnum.WARNING,
			text: 'AUTH.TOKEN_EMPTY'
		};

		// act
		AuthService.removeAccessToken();
		store.dispatch(AuthRefreshToken(0));

		// assert
		const expectedActions = [triggerMessage(message), failure()];
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('[AuthRefreshToken] Create success action on refresh token', () => {
		const store = mockStore(initialState);

		// mock api once
		mockedAxios.post.mockResolvedValueOnce({
			data: {
				access_token: accessToken
			}
		});

		// act
		store
			.dispatch(AuthRefreshToken(1))
			.then(() => {
				// update expires in
				const user = { ...mapUserDetail(accessToken), expires_in: NaN };

				// assert
				const expectedActions = [success(user)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[AuthLogout] Creates loading and terminate actions on logout', () => {
		const store = mockStore(initialState);

		// act
		store.dispatch(AuthLogout());

		// assert
		const expectedActions = [loader(), terminate()];
		expect(store.getActions()).toEqual(expectedActions);
	});
});
