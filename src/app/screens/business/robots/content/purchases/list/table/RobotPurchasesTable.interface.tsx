import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	SPCDataInterface,
	SPContentInterface
} from '../../../../../../../slices/purchases/Purchases.slice.interface';
import { RobotPurchasesTableColumnsTypeEnum } from './RobotPurchasesTable.enum';

export interface RobotPurchasesTableInterface {
	content: SPContentInterface | null;
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
	rowsPerPage: number;
	setRowsPerPage: Dispatch<SetStateAction<number>>;
}

export interface RobotPurchasesTableHeadInterface {
	columns: RobotPurchasesTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: RobotPurchasesTableColumnsTypeEnum) => void;
	order: RobotPurchasesTableHeadOrder;
	orderBy: RobotPurchasesTableColumnsTypeEnum;
}

export interface RobotPurchasesTableColumnInterface {
	id: RobotPurchasesTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotPurchasesTableHeadAlignment;
}

export interface RobotPurchasesTableBodyInterface {
	content: SPContentInterface | null;
	order: RobotPurchasesTableHeadOrder;
	orderBy: RobotPurchasesTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface RobotPurchasesTableBodyCellInterface {
	column: RobotPurchasesTableColumnInterface;
	purchase: SPCDataInterface;
}

export type RobotPurchasesTableHeadOrder = 'asc' | 'desc';
export type RobotPurchasesTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
