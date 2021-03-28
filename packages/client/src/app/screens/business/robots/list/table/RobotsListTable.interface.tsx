import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	RTSFinalDataInterface,
	RTSSContentInterface
} from '../../../../../slices/robot-twins/RobotTwinsSummary.slice.interface';

export interface RobotsListTableInterface {
	content: RTSSContentInterface | null;
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
	rowsPerPage: number;
	setRowsPerPage: Dispatch<SetStateAction<number>>;
}

export interface RobotsListTableHeadInterface {
	columns: RobotsListTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: RobotsListTableHeadId) => void;
	order: RobotsListTableHeadOrder;
	orderBy: RobotsListTableHeadId;
}

export interface RobotsListTableColumnInterface {
	id: RobotsListTableHeadId;
	label: string;
	minWidth?: number;
	align?: RobotsListTableHeadAlignment;
}

export interface RobotsListTableBodyInterface {
	content: RTSSContentInterface | null;
	order: RobotsListTableHeadOrder;
	orderBy: RobotsListTableHeadId;
	page: number;
	rowsPerPage: number;
}

export interface RobotsListTableBodyCellInterface {
	column: RobotsListTableColumnInterface;
	robot: RTSFinalDataInterface;
}

export type RobotsListTableHeadOrder = 'asc' | 'desc';
export type RobotsListTableHeadId =
	| 'robotTitle'
	| 'siteTitle'
	| 'isReady'
	| 'acceptOrders'
	| 'updatedAt'
	| 'alerts';
export type RobotsListTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
