import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	RTSFinalDataInterface,
	RTSSContentInterface
} from '../../../../../slices/robot-twins/RobotTwinsSummary.slice.interface';
import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';

export interface RobotsTableInterface {
	content: RTSSContentInterface | null;
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
	rowsPerPage: number;
	setRowsPerPage: Dispatch<SetStateAction<number>>;
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
	content: RTSSContentInterface | null;
	order: RobotsTableHeadOrder;
	orderBy: RobotsTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface RobotsTableBodyCellInterface {
	column: RobotsTableColumnInterface;
	robot: RTSFinalDataInterface;
}

export type RobotsTableHeadOrder = 'asc' | 'desc';
export type RobotsTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
