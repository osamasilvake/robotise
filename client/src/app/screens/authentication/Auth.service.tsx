import jwtDecode from 'jwt-decode';
import moment from 'moment';
import qs from 'querystring';

import { ClientService, ConfigService, StorageService } from '../../services';
import { StorageTypeEnum } from '../../services/services.enum';
import { AuthUserRoleEnum } from './Auth.enum';
import { AuthJWTInterface, AuthLoginInterface, AuthUserDetailInterface } from './Auth.interface';

class AuthService {
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
	 * @param StorageType
	 */
	setAccessToken = (accessToken: string, StorageType: StorageTypeEnum) => {
		if (StorageType === StorageTypeEnum.PERSISTANT) {
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
