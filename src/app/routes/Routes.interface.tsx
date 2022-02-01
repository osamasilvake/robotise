import { FC } from 'react';

import { RouteTypeEnum } from './Routes.enum';

export interface RoutesInterface {
	path: string;
	component: FC;
	template?: FC<LayoutPageInterface>;
	scope?: boolean;
	scopeName?: string;
}

export interface RoutesTemplateInterface {
	routes: RoutesInterface[];
	template: FC<LayoutPageInterface>;
	type: RouteTypeEnum;
}

export interface LayoutPageInterface {
	Component: FC;
}
