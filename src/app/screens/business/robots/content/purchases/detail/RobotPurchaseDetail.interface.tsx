import { SlicePurchaseInterface } from '../../../../../../slices/purchases/Purchase.slice.interface';
import { RobotPurchaseDetailTableColumnsTypeEnum } from './table/RobotPurchaseDetailTable.enum';

export interface RobotPurchaseDetailInterface {
	purchase: SlicePurchaseInterface | null;
}

export interface RobotPurchaseDetailHeadInterface {
	purchase: SlicePurchaseInterface | null;
}

export interface RobotPurchaseDetailTableColumnInterface {
	id: RobotPurchaseDetailTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotPurchaseDetailTableHeadAlignment;
}

export interface RobotPurchaseDetailFootInterface {
	purchase: SlicePurchaseInterface | null;
}

export type RobotPurchaseDetailTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
