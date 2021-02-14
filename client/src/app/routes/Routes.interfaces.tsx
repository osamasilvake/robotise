import { FC, ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { RouteTypeEnum } from './Routes.enum';

export interface RouteProperties {
	exact?: boolean;
	path: string;
	component: FC<PageProperties>;
	template?: FC<LayoutPageProperties>;
}

export interface RouteTemplateProperties {
	routes: RouteProperties[];
	template: FC<LayoutPageProperties>;
	type: RouteTypeEnum;
}

export interface LayoutPageProperties {
	Component: FC<PageProperties>;
	route: RouteComponentProps<ReactNode>;
}

export interface PageProperties<T = ReactNode> {
	route: RouteComponentProps<T>;
}
