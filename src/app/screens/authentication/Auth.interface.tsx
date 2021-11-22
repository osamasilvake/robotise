import { FC } from 'react';

import { RouteTypeEnum } from '../../routes/Routes.enum';
import { LayoutPageInterface, RoutesInterface } from '../../routes/Routes.interface';

export interface AuthInterface {
	route: RoutesInterface;
	template: FC<LayoutPageInterface>;
	type?: RouteTypeEnum;
}

export interface AuthLoginFormInterface {
	email: string;
	password: string;
	rememberMe?: boolean;
}

export interface AuthAxiosPostResponseInterface {
	access_token: string;
	expires_in: number;
	'not-before-policy': number;
	refresh_expires_in: number;
	scope: string;
	session_state: string;
	token_type: string;
}
