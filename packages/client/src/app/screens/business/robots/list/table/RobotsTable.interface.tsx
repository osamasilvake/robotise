import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	RTSFinalDataInterface,
	RTSSContentInterface
} from '../../../../../slices/robot-twins/RobotTwinsSummary.slice.interface';

export interface RobotsTableInterface {
	content: RTSSContentInterface | null;
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
	rowsPerPage: number;
	setRowsPerPage: Dispatch<SetStateAction<number>>;
}

export interface RobotsTableHeadInterface {
	columns: RobotsTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: RobotsTableHeadId) => void;
	order: RobotsTableHeadOrder;
	orderBy: RobotsTableHeadId;
}

export interface RobotsTableColumnInterface {
	id: RobotsTableHeadId;
	label: string;
	minWidth?: number;
	align?: RobotsTableHeadAlignment;
}

export interface RobotsTableBodyInterface {
	content: RTSSContentInterface | null;
	order: RobotsTableHeadOrder;
	orderBy: RobotsTableHeadId;
	page: number;
	rowsPerPage: number;
}

export interface RobotsTableBodyCellInterface {
	column: RobotsTableColumnInterface;
	robot: RTSFinalDataInterface;
}

export type RobotsTableHeadOrder = 'asc' | 'desc';
export type RobotsTableHeadId =
	| 'robotTitle'
	| 'siteTitle'
	| 'isReady'
	| 'acceptOrders'
	| 'updatedAt'
	| 'alerts';
export type RobotsTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
