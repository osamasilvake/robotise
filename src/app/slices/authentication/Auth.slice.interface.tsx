export interface SliceAuthInterface {
	loader: boolean;
	loading: boolean;
	user: AuthUserInterface | null;
}

export interface AuthJWTInterface {
	name: string;
	given_name: string;
	family_name: string;
	email: string;
	email_verified: boolean;
	scope: string;
	session_state: string;
	iat: number;
	exp: number;
	user_id: string;
	iss: string;
	typ: string;
	azp: string;
	jti: string;
	realm_access: AuthRealmAccessInterface[];
}

export interface AuthUserInterface {
	data: AuthUserDataInterface;
	email_verified: boolean;
	scope: string;
	session_state: string;
	iat: number;
	exp: number;
	iss: string;
	typ: string;
	azp: string;
	jti: string;
	realm_access: AuthRealmAccessInterface[];
}

export interface AuthUserDataInterface {
	user_id: string;
	display_name?: string;
	given_name: string;
	family_name: string;
	email: string;
}

export interface AuthRealmAccessInterface {
	roles: string[];
}
