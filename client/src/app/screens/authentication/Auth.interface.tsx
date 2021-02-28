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
	email: string;
	role: string;
	exp: number;
	user_id: string;
}

// user request payload
export interface AuthLoginInterface {
	email: string;
	password: string;
	rememberMe?: boolean;
}

// user response payload
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
