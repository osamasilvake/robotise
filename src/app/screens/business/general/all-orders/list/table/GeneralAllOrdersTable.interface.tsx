import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	SOCDataInterface,
	SOContentInterface
} from '../../../../../../slices/business/general/all-orders/AllOrders.slice.interface';
import { GeneralAllOrdersTableColumnsTypeEnum } from './GeneralAllOrdersTable.enum';

export interface GeneralAllOrdersTableInterface {
	content: SOContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface GeneralAllOrdersTableHeadInterface {
	columns: GeneralAllOrdersTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: GeneralAllOrdersTableColumnsTypeEnum) => void;
	order: GeneralAllOrdersTableHeadOrder;
	orderBy: GeneralAllOrdersTableColumnsTypeEnum;
}

export interface GeneralAllOrdersTableBodyInterface {
	content: SOContentInterface | null;
	order: GeneralAllOrdersTableHeadOrder;
	orderBy: GeneralAllOrdersTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface GeneralAllOrdersTableBodyCellInterface {
	column: GeneralAllOrdersTableColumnInterface;
	order: SOCDataInterface;
}

export interface DialogCancelOrderInterface {
	order: SOCDataInterface;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogRestartOrderInterface {
	order: SOCDataInterface;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface GeneralAllOrdersTableColumnInterface {
	id: GeneralAllOrdersTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: GeneralAllOrdersTableHeadAlignment;
	noSort?: boolean;
}

export type GeneralAllOrdersTableHeadOrder = 'asc' | 'desc';
export type GeneralAllOrdersTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
