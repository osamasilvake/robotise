import { MouseEvent } from 'react';

import {
	RTSContentDataInterface,
	RTSContentInterface
} from '../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';

export interface RobotsTableInterface {
	content: RTSContentInterface | null;
	hideTableScroll?: boolean;
	hideSearch?: boolean;
	siteId?: string;
}

export interface RobotsTableHeadInterface {
	columns: RobotsTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: RobotsTableColumnsTypeEnum) => void;
	order: RobotsTableHeadOrder;
	orderBy: RobotsTableColumnsTypeEnum;
}

export interface RobotsTableBodyInterface {
	content: RTSContentInterface | null;
	order: RobotsTableHeadOrder;
	orderBy: RobotsTableColumnsTypeEnum;
	siteId?: string;
	hideSearch?: boolean;
}

export interface RobotsTableBodyCellInterface {
	column: RobotsTableColumnInterface;
	robot: RTSContentDataInterface;
}

export interface RobotsTableColumnInterface {
	id: RobotsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotsTableHeadAlignment;
	noSort?: boolean;
	padding?: string;
}

export type RobotsTableHeadOrder = 'asc' | 'desc';
export type RobotsTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
