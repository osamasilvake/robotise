import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	SOCDataInterface,
	SOContentInterface
} from '../../../../../../../slices/orders/Orders.slice.interface';
import { RobotOrdersTableColumnsTypeEnum } from './RobotOrdersTable.enum';

export interface RobotOrdersTableInterface {
	content: SOContentInterface | null;
	executing: boolean;
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
	rowsPerPage: number;
	setRowsPerPage: Dispatch<SetStateAction<number>>;
}

export interface RobotOrdersTableHeadInterface {
	columns: RobotOrdersTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: RobotOrdersTableColumnsTypeEnum) => void;
	order: RobotOrdersTableHeadOrder;
	orderBy: RobotOrdersTableColumnsTypeEnum;
}

export interface RobotOrdersTableColumnInterface {
	id: RobotOrdersTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotOrdersTableHeadAlignment;
}

export interface RobotOrdersTableBodyInterface {
	content: SOContentInterface | null;
	executing: boolean;
	order: RobotOrdersTableHeadOrder;
	orderBy: RobotOrdersTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface RobotOrdersTableBodyCellInterface {
	column: RobotOrdersTableColumnInterface;
	order: SOCDataInterface;
	executing: boolean;
}

export interface DialogCancelOrderInterface {
	order: SOCDataInterface;
	executing: boolean;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export type RobotOrdersTableHeadOrder = 'asc' | 'desc';
export type RobotOrdersTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
