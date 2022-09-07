import { SliceAllOrderInterface } from '../../../../../../slices/business/general/all-orders/AllOrder.slice.interface';
import { GeneralAllOrderTableColumnsTypeEnum } from './GeneralAllOrderTable.enum';

export interface GeneralAllOrderTableInterface {
	order: SliceAllOrderInterface | null;
}

export interface GeneralAllOrderTableColumnInterface {
	id: GeneralAllOrderTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: GeneralAllOrderTableHeadAlignment;
}

export type GeneralAllOrderTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
