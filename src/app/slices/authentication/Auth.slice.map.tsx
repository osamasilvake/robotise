import { jwtDecode } from '../../utilities/methods/Decode';
import { AuthJWTInterface, AuthUserInterface } from './Auth.slice.interface';

/**
 * parse and map user info from access token
 * @param accessToken
 */
export const mapUserDetail = (accessToken: string): AuthUserInterface => {
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
