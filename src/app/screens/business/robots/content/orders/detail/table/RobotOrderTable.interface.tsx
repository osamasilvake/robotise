import { SliceOrderInterface } from '../../../../../../../slices/orders/Order.slice.interface';
import { RobotOrderTableColumnsTypeEnum } from './RobotOrderTable.enum';

export interface RobotOrderTableInterface {
	order: SliceOrderInterface | null;
}

export interface RobotOrderTableColumnInterface {
	id: RobotOrderTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotOrderTableHeadAlignment;
}

export type RobotOrderTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
