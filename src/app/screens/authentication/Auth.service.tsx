import axios from 'axios';

import { AppConfigService, HttpClientService, StorageService } from '../../services';
import { StorageTypeEnum } from '../../services/storage/Storage.enum';
import {
	AuthJWTInterface,
	AuthUserInterface
} from '../../slices/authentication/Auth.slice.interface';
import { jwtDecode } from '../../utilities/methods/Decode';
import { momentNow } from '../../utilities/methods/Moment';
import { serializeObj } from '../../utilities/methods/Object';
import { AuthAxiosPostResponseInterface, AuthLoginFormInterface } from './Auth.interface';

class AuthService {
	/**
	 * login user
	 * @param payload
	 */
	authLogin = (payload: AuthLoginFormInterface) => {
		const request = {
			username: payload.email,
			password: payload.password,
			grant_type: 'password',
			client_id: 'roc-app'
		};
		return HttpClientService.post<string, AuthAxiosPostResponseInterface>(
			AppConfigService.AppServices.AUTH.SIGN_IN,
			serializeObj(request),
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
		const now = momentNow();
		const exp = decoded.exp * 1000;
		return now < exp;
	};

	/**
	 * requests a new token
	 */
	authRequestNewToken = () => {
		const request = {
			access_token: this.getAccessToken(),
			client_id: 'roc-app'
		};
		return HttpClientService.post<string, AuthAxiosPostResponseInterface>(
			AppConfigService.AppServices.AUTH.AUTO_REFRESH,
			serializeObj(request),
			{
				headers: AppConfigService.AppRequestHeaders.form
			}
		);
	};

	/**
	 * fetch user info from decoded token
	 * @param accessToken
	 */
	authUserDetail = (accessToken: string): AuthUserInterface => {
		const decoded: AuthJWTInterface = jwtDecode(accessToken);
		return {
			realm_access: decoded.realm_access,
			data: {
				user_id: decoded.user_id,
				display_name: decoded.name,
				given_name: decoded.given_name,
				family_name: decoded.family_name,
				email: decoded.email
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
		// set authorization to headers
		this.setAuthorizationToHeaders(accessToken);

		// storage: JWT access token
		if (storageType === StorageTypeEnum.PERSISTENT) {
			StorageService.put(AppConfigService.StorageItems.JWTAccessToken, accessToken);
		} else {
			StorageService.put(
				AppConfigService.StorageItems.JWTAccessToken,
				accessToken,
				StorageTypeEnum.SESSION
			);
		}
	};

	/**
	 * get access token
	 */
	getAccessToken = () => {
		return StorageService.get(AppConfigService.StorageItems.JWTAccessToken);
	};

	/**
	 * remove access token
	 */
	removeAccessToken = () => {
		// delete authorization from headers
		this.removeAuthorizationToHeaders();

		// remove from storage
		if (this.getAccessToken()) {
			StorageService.remove(AppConfigService.StorageItems.JWTAccessToken);
		}
	};

	/**
	 * set authorization to headers
	 * @param accessToken
	 */
	setAuthorizationToHeaders = (accessToken: string) => {
		axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	};

	/**
	 * remove authorization from headers
	 */
	removeAuthorizationToHeaders = () => {
		delete axios.defaults.headers.common.Authorization;
	};
}
const instance = new AuthService();
export default instance;
