import { SlicePurchaseInterface } from '../../../../../../../slices/purchases/Purchase.slice.interface';
import { RobotPurchaseDetailTableColumnsTypeEnum } from './RobotPurchaseDetailTable.enum';

export interface RobotPurchaseDetailTableInterface {
	purchase: SlicePurchaseInterface | null;
}

export interface RobotPurchaseDetailTableColumnInterface {
	id: RobotPurchaseDetailTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotPurchaseDetailTableHeadAlignment;
}

export type RobotPurchaseDetailTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
