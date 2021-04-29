import { MouseEvent } from 'react';

import {
	SPCDataInterface,
	SPContentInterface
} from '../../../../../../../slices/purchases/Purchases.slice.interface';
import { RobotPurchasesTableColumnsTypeEnum } from './RobotPurchasesTable.enum';

export interface RobotPurchasesFetchListInterface {
	robotId: string | undefined;
	page: number;
	rowsPerPage: number;
	billed: boolean;
	debug: boolean;
}

export interface RobotPurchasesTableInterface {
	content: SPContentInterface | null;
	page: number;
	rowsPerPage: number;
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
	purchase: SPCDataInterface;
	column: RobotPurchasesTableColumnInterface;
}

export interface TableFieldCommentInterface {
	purchase: SPCDataInterface;
}

export type RobotPurchasesTableHeadOrder = 'asc' | 'desc';
export type RobotPurchasesTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
