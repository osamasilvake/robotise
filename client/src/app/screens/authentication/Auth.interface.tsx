/**
 * JWT access token payload
 */
export interface AuthJWTInterface {
	name: string;
	email: string;
	role: string;
	exp: number;
	user_id: string;
}

/**
 * user payload
 */
export interface AuthUserDetailInterface {
	data: AuthUserDataInterface;
	role: string;
	exp: number;
	uuid: string;
}

export interface AuthUserDataInterface {
	displayName?: string;
	email: string;
}
