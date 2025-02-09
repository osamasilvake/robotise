import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	SOCDataInterface,
	SOContentInterface
} from '../../../../../../../slices/business/robots/orders/Orders.slice.interface';
import { RobotOrdersTableColumnsTypeEnum } from './RobotOrdersTable.enum';

export interface RobotOrdersTableInterface {
	content: SOContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface RobotOrdersTableHeadInterface {
	columns: RobotOrdersTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: RobotOrdersTableColumnsTypeEnum) => void;
	order: RobotOrdersTableHeadOrder;
	orderBy: RobotOrdersTableColumnsTypeEnum;
}

export interface RobotOrdersTableBodyInterface {
	content: SOContentInterface | null;
	order: RobotOrdersTableHeadOrder;
	orderBy: RobotOrdersTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface RobotOrdersTableBodyCellInterface {
	column: RobotOrdersTableColumnInterface;
	order: SOCDataInterface;
}

export interface DialogCancelOrderInterface {
	order: SOCDataInterface;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogRestartOrderInterface {
	order: SOCDataInterface;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface RobotOrdersTableColumnInterface {
	id: RobotOrdersTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotOrdersTableHeadAlignment;
	noSort?: boolean;
	padding?: string;
}

export type RobotOrdersTableHeadOrder = 'asc' | 'desc';
export type RobotOrdersTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
