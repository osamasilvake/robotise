import { FC, ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { RouteTypeEnum } from '../../routes/Routes.enum';
import { LayoutPageProperties, RouteProperties } from '../../routes/Routes.interfaces';

/**
 * Auth properties
 */
export interface AuthProperties<T = ReactNode> {
	appRoute: RouteProperties;
	template: FC<LayoutPageProperties>;
	route: RouteComponentProps<T>;
	type: RouteTypeEnum;
}

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
