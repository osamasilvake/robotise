import { FC, ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { RouteTypeEnum } from '../../routes/Routes.enum';
import { LayoutPageInterface, RouteInterface } from '../../routes/Routes.interfaces';

// auth properties
export interface AuthInterface<T = ReactNode> {
	appRoute: RouteInterface;
	template: FC<LayoutPageInterface>;
	route: RouteComponentProps<T>;
	type: RouteTypeEnum;
}

// JWT access token payload
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
	realm_access: realmAccessInterface[];
}

export interface realmAccessInterface {
	roles: string[];
}

// custom user payload
export interface AuthUserDetailInterface {
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
	realm_access: realmAccessInterface[];
}

export interface AuthUserDataInterface {
	user_id: string;
	display_name?: string;
	given_name: string;
	family_name: string;
	email: string;
	role: string;
}

export interface AuthLoginInterface {
	email: string;
	password: string;
	rememberMe?: boolean;
}
