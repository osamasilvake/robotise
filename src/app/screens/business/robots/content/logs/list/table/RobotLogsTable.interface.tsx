import { MouseEvent } from 'react';

import {
	SLCDataInterface,
	SLContentInterface
} from '../../../../../../../slices/business/robots/logs/Logs.slice.interface';
import { RobotLogsTableColumnsTypeEnum } from './RobotLogsTable.enum';

export interface RobotLogsTableInterface {
	content: SLContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface RobotLogsTableHeadInterface {
	columns: RobotLogsTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: RobotLogsTableColumnsTypeEnum) => void;
	order: RobotLogsTableHeadOrder;
	orderBy: RobotLogsTableColumnsTypeEnum;
}

export interface RobotLogsTableBodyInterface {
	content: SLContentInterface | null;
	order: RobotLogsTableHeadOrder;
	orderBy: RobotLogsTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface RobotLogsTableBodyCellInterface {
	column: RobotLogsTableColumnInterface;
	log: SLCDataInterface;
}

export interface RobotLogsTableColumnInterface {
	id: RobotLogsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotLogsTableHeadAlignment;
	noSort?: boolean;
}

export type RobotLogsTableHeadOrder = 'asc' | 'desc';
export type RobotLogsTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
