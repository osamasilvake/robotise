import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import qs from 'querystring';

import { AppConfigService, HttpClientService, StorageService } from '../../services';
import { StorageTypeEnum } from '../../services/storage/Storage.enum';
import { AuthUserRoleTypeEnum } from './Auth.enum';
import { AuthJWTInterface, AuthLoginInterface, AuthUserDetailInterface } from './Auth.interface';

class AuthService {
	/**
	 * login user
	 * @param payload
	 */
	authLogin = (payload: AuthLoginInterface) => {
		const request = {
			username: payload.email,
			password: payload.password,
			grant_type: 'password',
			client_id: 'roc-ops-app'
		};
		return HttpClientService.post(
			AppConfigService.AppServices.AUTH.SIGN_IN,
			qs.stringify(request),
			{
				headers: AppConfigService.AppRequestHeaders.form
			}
		);
	};

	/**
	 * validate auth token
	 * @param accessToken
	 */
	authTokenValid = (accessToken: string) => {
		const decoded: AuthJWTInterface = jwtDecode(accessToken);
		const now = moment().valueOf();
		const exp = decoded.exp * 1000;
		return now < exp;
	};

	/**
	 * requests a new token
	 */
	authRequestNewToken = () => {
		const request = {
			access_token: this.getAccessToken(),
			client_id: 'roc-ops-app'
		};
		return HttpClientService.post(
			AppConfigService.AppServices.AUTH.AUTO_REFRESH,
			qs.stringify(request),
			{
				headers: AppConfigService.AppRequestHeaders.form
			}
		);
	};

	/**
	 * fetch user info from decoded token
	 * @param accessToken
	 */
	authUserDetail = (accessToken: string): AuthUserDetailInterface => {
		const decoded: AuthJWTInterface = jwtDecode(accessToken);
		return {
			realm_access: decoded.realm_access,
			data: {
				user_id: decoded.user_id,
				display_name: decoded.name,
				given_name: decoded.given_name,
				family_name: decoded.family_name,
				email: decoded.email,
				role: AuthUserRoleTypeEnum.ADMIN
			},
			iat: decoded.iat,
			exp: decoded.exp,
			iss: decoded.iss,
			typ: decoded.typ,
			azp: decoded.azp,
			jti: decoded.jti,
			session_state: decoded.session_state,
			scope: decoded.scope,
			email_verified: decoded.email_verified
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
	 * @param storageType
	 */
	setAccessToken = (accessToken: string, storageType: StorageTypeEnum) => {
		axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

		if (storageType === StorageTypeEnum.PERSISTANT) {
			StorageService.put(AppConfigService.AppLocalStorageItems.JWTAccessToken, accessToken);
		} else {
			StorageService.put(
				AppConfigService.AppSessionStorageItems.JWTAccessToken,
				accessToken,
				StorageTypeEnum.SESSION
			);
		}
	};

	/**
	 * get access token
	 */
	getAccessToken = () => {
		return (
			StorageService.get(AppConfigService.AppLocalStorageItems.JWTAccessToken) ||
			StorageService.get(
				AppConfigService.AppSessionStorageItems.JWTAccessToken,
				StorageTypeEnum.SESSION
			)
		);
	};

	/**
	 * remove access token
	 */
	removeAccessToken = () => {
		delete axios.defaults.headers.common.Authorization;

		if (this.getAccessToken()) {
			StorageService.remove(AppConfigService.AppLocalStorageItems.JWTAccessToken);
			StorageService.remove(
				AppConfigService.AppSessionStorageItems.JWTAccessToken,
				StorageTypeEnum.SESSION
			);
		}
	};
}
const instance = new AuthService();
export default instance;
