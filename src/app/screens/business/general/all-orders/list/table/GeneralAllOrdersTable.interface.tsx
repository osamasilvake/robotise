import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	SAOContentInterface,
	SAODataInterface
} from '../../../../../../slices/business/general/all-orders/AllOrders.slice.interface';
import { GeneralAllOrdersTableColumnsTypeEnum } from './GeneralAllOrdersTable.enum';

export interface GeneralAllOrdersTableInterface {
	content: SAOContentInterface | null;
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
	content: SAOContentInterface | null;
	order: GeneralAllOrdersTableHeadOrder;
	orderBy: GeneralAllOrdersTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface GeneralAllOrdersTableBodyCellInterface {
	column: GeneralAllOrdersTableColumnInterface;
	order: SAODataInterface;
}

export interface DialogCancelOrderInterface {
	order: SAODataInterface;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogRestartOrderInterface {
	order: SAODataInterface;
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
	padding?: string;
}

export type GeneralAllOrdersTableHeadOrder = 'asc' | 'desc';
export type GeneralAllOrdersTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
