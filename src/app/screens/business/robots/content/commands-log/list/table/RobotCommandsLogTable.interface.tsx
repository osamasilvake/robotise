import { MouseEvent } from 'react';

import {
	CLCDataInterface,
	CLContentInterface
} from '../../../../../../../slices/business/robots/commands-log/CommandsLog.slice.interface';
import { RobotCommandsLogTableColumnsTypeEnum } from './RobotCommandsLogTable.enum';

export interface RobotCommandsLogTableInterface {
	content: CLContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface RobotCommandsLogTableHeadInterface {
	columns: RobotCommandsLogTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: RobotCommandsLogTableColumnsTypeEnum) => void;
	order: RobotCommandsLogTableHeadOrder;
	orderBy: RobotCommandsLogTableColumnsTypeEnum;
}

export interface RobotCommandsLogTableBodyInterface {
	content: CLContentInterface | null;
	order: RobotCommandsLogTableHeadOrder;
	orderBy: RobotCommandsLogTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface RobotCommandsLogTableBodyCellInterface {
	column: RobotCommandsLogTableColumnInterface;
	log: CLCDataInterface;
}

export interface RobotCommandsLogTableColumnInterface {
	id: RobotCommandsLogTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotCommandsLogTableHeadAlignment;
	noSort?: boolean;
}

export type RobotCommandsLogTableHeadOrder = 'asc' | 'desc';
export type RobotCommandsLogTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
