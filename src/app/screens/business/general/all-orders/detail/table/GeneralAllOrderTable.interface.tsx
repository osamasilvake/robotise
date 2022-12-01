import { SliceAllOrderInterface } from '../../../../../../slices/business/general/all-orders/AllOrder.slice.interface';
import { SAODataHistoryInterface } from '../../../../../../slices/business/general/all-orders/AllOrders.slice.interface';
import { GeneralAllOrderTableColumnsTypeEnum } from './GeneralAllOrderTable.enum';

export interface GeneralAllOrderTableInterface {
	order: SliceAllOrderInterface | null;
}

export interface GeneralAllOrderTableHeadInterface {
	columns: GeneralAllOrderTableColumnInterface[];
}

export interface GeneralAllOrderTableBodyInterface {
	order: SliceAllOrderInterface | null;
}

export interface GeneralAllOrderTableBodyCellInterface {
	column: GeneralAllOrderTableColumnInterface;
	order: SAODataHistoryInterface;
	nextOrder: SAODataHistoryInterface;
	firstOrder: SAODataHistoryInterface;
}

export interface GeneralAllOrderTableColumnInterface {
	id: GeneralAllOrderTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: GeneralAllOrderTableHeadAlignment;
}

export type GeneralAllOrderTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
