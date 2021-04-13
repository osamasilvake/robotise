import { InventoryContentDrawerInterface } from '../../../../../slices/inventory/Inventory.slice.interface';

export interface RobotInventoryDrawerInterface {
	drawer: InventoryContentDrawerInterface;
}

export interface RobotInventoryTableColumnInterface {
	id: RobotInventoryTableHeadId;
	label: string;
	minWidth?: number;
	align?: RobotInventoryTableHeadAlignment;
}

export type RobotInventoryTableHeadId =
	| 'image'
	| 'name'
	| 'volume'
	| 'quantity'
	| 'capacity'
	| 'price';
export type RobotInventoryTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
