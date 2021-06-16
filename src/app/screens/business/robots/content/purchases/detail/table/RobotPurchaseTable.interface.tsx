import { SlicePurchaseInterface } from '../../../../../../../slices/purchases/Purchase.slice.interface';
import { RobotPurchaseTableColumnsTypeEnum } from './RobotPurchaseTable.enum';

export interface RobotPurchaseTableInterface {
	purchase: SlicePurchaseInterface | null;
}

export interface RobotPurchaseTableColumnInterface {
	id: RobotPurchaseTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotPurchaseTableHeadAlignment;
}

export type RobotPurchaseTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
