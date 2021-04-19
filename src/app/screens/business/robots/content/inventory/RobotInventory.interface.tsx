import {
	SICDrawerInterface,
	SliceInventoryInterface
} from '../../../../../slices/inventory/Inventory.slice.interface';
import { RobotInventoryColumnsTypeEnum } from './RobotInventory.enum';

export interface RobotInventoryDrawersInterface {
	inventory: SliceInventoryInterface;
}

export interface RobotInventoryDrawerInterface {
	drawer: SICDrawerInterface;
	isLastDrawer: boolean;
}

export interface RobotInventoryTableColumnInterface {
	id: RobotInventoryColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotInventoryTableHeadAlignment;
}

export type RobotInventoryTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
