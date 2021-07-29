import { SICDrawerInterface } from '../../../../../../../slices/business/robots/inventory/Inventory.slice.interface';
import { RobotInventoryTableColumnsTypeEnum } from './RobotInventoryTable.enum';

export interface RobotInventoryTableInterface {
	drawer: SICDrawerInterface;
	isLastDrawer: boolean;
}

export interface RobotInventoryTableColumnInterface {
	id: RobotInventoryTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotInventoryTableHeadAlignment;
}

export type RobotInventoryTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
