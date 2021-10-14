import { MouseEvent } from 'react';

import {
	SPCDataInterface,
	SPContentInterface
} from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { RobotPurchasesTableColumnsTypeEnum } from './RobotPurchasesTable.enum';

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

export interface TableFieldCommentFormInterface {
	comment: string;
}

export interface RobotPurchasesTableColumnInterface {
	id: RobotPurchasesTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotPurchasesTableHeadAlignment;
	noSort?: boolean;
}

export type RobotPurchasesTableHeadOrder = 'asc' | 'desc';
export type RobotPurchasesTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
