import { MouseEvent } from 'react';

import {
	RTSContentDataInterface,
	RTSContentInterface
} from '../../../../../slices/robots/RobotTwinsSummary.slice.interface';
import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';

export interface RobotsTableInterface {
	content: RTSContentInterface | null;
}

export interface RobotsTableHeadInterface {
	columns: RobotsTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: RobotsTableColumnsTypeEnum) => void;
	order: RobotsTableHeadOrder;
	orderBy: RobotsTableColumnsTypeEnum;
}

export interface RobotsTableColumnInterface {
	id: RobotsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotsTableHeadAlignment;
}

export interface RobotsTableBodyInterface {
	content: RTSContentInterface | null;
	order: RobotsTableHeadOrder;
	orderBy: RobotsTableColumnsTypeEnum;
}

export interface RobotsTableBodyCellInterface {
	column: RobotsTableColumnInterface;
	robot: RTSContentDataInterface;
}

export type RobotsTableHeadOrder = 'asc' | 'desc';
export type RobotsTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
