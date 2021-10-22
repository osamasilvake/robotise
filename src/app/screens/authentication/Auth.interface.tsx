import { FC, ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { RouteTypeEnum } from '../../routes/Routes.enum';
import { LayoutPageInterface, RouteInterface } from '../../routes/Routes.interfaces';

export interface AuthInterface<T = ReactNode> {
	appRoute: RouteInterface;
	template: FC<LayoutPageInterface>;
	route: RouteComponentProps<T>;
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
