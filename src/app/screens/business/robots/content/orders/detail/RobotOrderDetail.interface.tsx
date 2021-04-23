import { SliceOrderInterface } from '../../../../../../slices/orders/Order.slice.interface';
import { RobotOrderColumnsTypeEnum } from './RobotOrderDetail.enum';

export interface RobotOrderDetailInterface {
	order: SliceOrderInterface | null;
}

export interface RobotOrderTableColumnInterface {
	id: RobotOrderColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotOrderTableHeadAlignment;
}

export type RobotOrderTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
