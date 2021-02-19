import jwtDecode from 'jwt-decode';

import { AppLocalStorageItems } from '../../../app.config';
import { AuthUserRoleEnum } from './Auth.enum';
import { AuthJWTInterface, AuthUserDetailInterface } from './Auth.interface';

class AuthService {
	/**
	 * set access token
	 * @param accessToken
	 */
	setAccessToken = (accessToken?: string) => {
		if (accessToken) {
			localStorage.setItem(AppLocalStorageItems.JWTAccessTokken, accessToken);
		} else {
			localStorage.removeItem(AppLocalStorageItems.JWTAccessTokken);
		}
	};

	/**
	 * get access token
	 */
	getAccessToken = () => {
		return localStorage.getItem(AppLocalStorageItems.JWTAccessTokken);
	};

	/**
	 * validate auth token
	 * @param accessToken
	 */
	isAuthTokenValid = (accessToken: string) => {
		const decoded: AuthJWTInterface = jwtDecode(accessToken);
		const now = Date.now();
		const exp = decoded.exp * 1000;
		return now < exp;
	};

	/**
	 * get user info from decoded token
	 * @param decodedToken
	 */
	getUserDetail = (accessToken: string): AuthUserDetailInterface => {
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
}
const instance = new AuthService();
export default instance;
