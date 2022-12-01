import { SliceOrderInterface } from '../../../../../../../slices/business/robots/orders/Order.slice.interface';
import { SOCDataHistoryInterface } from '../../../../../../../slices/business/robots/orders/Orders.slice.interface';
import { RobotOrderTableColumnsTypeEnum } from './RobotOrderTable.enum';

export interface RobotOrderTableInterface {
	order: SliceOrderInterface | null;
}

export interface RobotOrderTableHeadInterface {
	columns: RobotOrderTableColumnInterface[];
}

export interface RobotOrderTableBodyInterface {
	order: SliceOrderInterface | null;
}

export interface RobotOrderTableBodyCellInterface {
	column: RobotOrderTableColumnInterface;
	order: SOCDataHistoryInterface;
	nextOrder: SOCDataHistoryInterface;
	firstOrder: SOCDataHistoryInterface;
}

export interface RobotOrderTableColumnInterface {
	id: RobotOrderTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotOrderTableHeadAlignment;
}

export type RobotOrderTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
