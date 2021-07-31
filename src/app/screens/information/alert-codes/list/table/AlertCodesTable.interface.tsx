import { MouseEvent } from 'react';

import {
	SACContentInterface,
	SACDataInterface
} from '../../../../../slices/information/alert-codes/AlertCodes.interface';
import { AlertCodesTableColumnsTypeEnum } from './AlertCodesTable.enum';

export interface AlertCodesTableInterface {
	content: SACContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface AlertCodesTableHeadInterface {
	columns: AlertCodesTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: AlertCodesTableColumnsTypeEnum) => void;
	order: AlertCodesTableHeadOrder;
	orderBy: AlertCodesTableColumnsTypeEnum;
}

export interface AlertCodesTableBodyInterface {
	content: SACContentInterface | null;
	order: AlertCodesTableHeadOrder;
	orderBy: AlertCodesTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface AlertCodesTableBodyCellInterface {
	alertCode: SACDataInterface;
	column: AlertCodesTableColumnInterface;
}

export interface AlertCodesTableColumnInterface {
	id: AlertCodesTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: AlertCodesTableHeadAlignment;
}

export type AlertCodesTableHeadOrder = 'asc' | 'desc';
export type AlertCodesTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
