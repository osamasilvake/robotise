import { Dispatch, MouseEvent, SetStateAction } from 'react';

import { RobotsSliceResponseAllInterface } from '../../../../slices/robots/Robots.slice.interface';

export interface RobotsListTableInterface {
	content: RobotsSliceResponseAllInterface | null;
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
	content: RobotsSliceResponseAllInterface | null;
	order: RobotsListTableHeadOrder;
	orderBy: RobotsListTableHeadId;
	page: number;
	rowsPerPage: number;
}

export type RobotsListTableHeadOrder = 'asc' | 'desc';
export type RobotsListTableHeadId = 'name' | 'siteTitle' | 'isReady' | 'updatedAt' | 'alerts';
export type RobotsListTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
