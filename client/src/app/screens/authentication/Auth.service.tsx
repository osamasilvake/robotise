import jwtDecode from 'jwt-decode';
import moment from 'moment';
import qs from 'querystring';

import { ClientService, ConfigService, StorageService } from '../../services';
import { StorageTypeEnum } from '../../services/index.enum';
import { AuthUserRoleEnum } from './Auth.enum';
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
		return ClientService.post(ConfigService.AppServices.AUTH.SIGN_IN, qs.stringify(request), {
			headers: ConfigService.AppRequestHeaders.post
		});
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
				role: AuthUserRoleEnum.ADMIN
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
	 * requests a new token
	 */
	authRequestNewToken = () => {
		const request = {
			access_token: this.getAccessToken(),
			client_id: 'roc-ops-app'
		};
		return ClientService.post(
			ConfigService.AppServices.AUTH.AUTO_REFRESH,
			qs.stringify(request),
			{
				headers: ConfigService.AppRequestHeaders.post
			}
		);
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
		if (storageType === StorageTypeEnum.PERSISTANT) {
			StorageService.put(ConfigService.AppLocalStorageItems.JWTAccessToken, accessToken);
		} else {
			StorageService.put(
				ConfigService.AppSessionStorageItems.JWTAccessToken,
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
			StorageService.get(ConfigService.AppLocalStorageItems.JWTAccessToken) ||
			StorageService.get(
				ConfigService.AppSessionStorageItems.JWTAccessToken,
				StorageTypeEnum.SESSION
			)
		);
	};

	/**
	 * remove access token
	 */
	removeAccessToken = () => {
		if (this.getAccessToken()) {
			StorageService.remove(ConfigService.AppLocalStorageItems.JWTAccessToken);
			StorageService.remove(
				ConfigService.AppSessionStorageItems.JWTAccessToken,
				StorageTypeEnum.SESSION
			);
		}
	};
}
const instance = new AuthService();
export default instance;
