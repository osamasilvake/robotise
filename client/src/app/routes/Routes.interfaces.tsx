import { FC, ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { RouteTypeEnum } from './Routes.enum';

// route
export interface RouteInterface {
	exact?: boolean;
	path: string;
	component: FC<PageInterface>;
	template?: FC<LayoutPageInterface>;
}
export interface RouteTemplateInterface {
	routes: RouteInterface[];
	template: FC<LayoutPageInterface>;
	type: RouteTypeEnum;
}

// page layout
export interface LayoutPageInterface {
	Component: FC<PageInterface>;
	route: RouteComponentProps<ReactNode>;
}

// page
export interface PageInterface<T = ReactNode> {
	route: RouteComponentProps<T>;
}
