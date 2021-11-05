import { FC } from 'react';

import { RouteTypeEnum } from './Routes.enum';

export interface RouteInterface {
	path: string;
	component: FC;
	template?: FC<LayoutPageInterface>;
}

export interface RoutesTemplateInterface {
	routes: RouteInterface[];
	template: FC<LayoutPageInterface>;
	type: RouteTypeEnum;
}

export interface LayoutPageInterface {
	Component: FC;
}
