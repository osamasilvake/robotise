import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	OrderDataInterface,
	OrdersContentInterface
} from '../../../../../../../slices/orders/Orders.slice.interface';
import { RobotOrdersTableColumnsTypeEnum } from './RobotOrdersTable.enum';

export interface RobotOrdersTableInterface {
	content: OrdersContentInterface | null;
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
	content: OrdersContentInterface | null;
	order: RobotOrdersTableHeadOrder;
	orderBy: RobotOrdersTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface RobotOrdersTableBodyCellInterface {
	column: RobotOrdersTableColumnInterface;
	order: OrderDataInterface;
}

export type RobotOrdersTableHeadOrder = 'asc' | 'desc';
export type RobotOrdersTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
