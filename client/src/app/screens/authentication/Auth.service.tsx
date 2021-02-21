import jwtDecode from 'jwt-decode';

import AppConfig from '../../../app.config';
import { Api, ApiClient, ApiEnv } from '../../services';
import { AuthUserRoleEnum } from './Auth.enum';
import { AuthJWTInterface, AuthLoginInterface, AuthUserDetailInterface } from './Auth.interface';

class AuthService extends Api {
	/**
	 * login user
	 * @param payload
	 */
	authLogin = (payload: AuthLoginInterface) => {
		// request
		const request = {
			username: payload.email,
			password: payload.password,
			grant_type: 'password',
			client_id: 'roc-ops-app'
		};

		return ApiClient.post(
			`${this.getUrl()}/auth/${ApiEnv.realm}/login`,
			JSON.stringify(request),
			{
				headers: AppConfig.AppRequestHeaders.post
			}
		);
	};

	/**
	 * validate auth token
	 * @param accessToken
	 */
	authTokenValid = (accessToken: string) => {
		const decoded: AuthJWTInterface = jwtDecode(accessToken);
		const now = Date.now();
		const exp = decoded.exp * 1000;
		return now < exp;
	};

	/**
	 * get user info from decoded token
	 * @param accessToken
	 */
	authUserDetail = (accessToken: string): AuthUserDetailInterface => {
		const decoded: AuthJWTInterface = jwtDecode(accessToken);
		return {
			data: {
				displayName: decoded.name,
				email: decoded.email
			},
			role: AuthUserRoleEnum.ADMIN,
			exp: decoded.exp,
			uuid: decoded.user_id
		};
	};

	/**
	 * logout user
	 */
	authLogout = () => {
		this.removeAccessToken();
	};

	/**
	 * set access token
	 * @param accessToken
	 */
	setAccessToken = (accessToken: string) => {
		localStorage.setItem(AppConfig.AppLocalStorageItems.JWTAccessTokken, accessToken);
	};

	/**
	 * get access token
	 */
	getAccessToken = () => {
		return localStorage.getItem(AppConfig.AppLocalStorageItems.JWTAccessTokken);
	};

	/**
	 * remove access token
	 */
	removeAccessToken = () => {
		localStorage.removeItem(AppConfig.AppLocalStorageItems.JWTAccessTokken);
	};
}
const instance = new AuthService();
export default instance;
