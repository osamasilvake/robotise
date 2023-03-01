import { MouseEvent } from 'react';

import {
	ASLContentInterface,
	ASLDataInterface
} from '../../../../../../slices/business/general/all-sms-list/AllSMSList.slice.interface';
import { GeneralAllSMSListTableColumnsTypeEnum } from './GeneralAllSMSListTable.enum';

export interface GeneralAllSMSListTableInterface {
	content: ASLContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface GeneralAllSMSListTableHeadInterface {
	columns: GeneralAllSMSListTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: GeneralAllSMSListTableColumnsTypeEnum) => void;
	order: GeneralAllSMSListTableHeadOrder;
	orderBy: GeneralAllSMSListTableColumnsTypeEnum;
}

export interface GeneralAllSMSListTableBodyInterface {
	content: ASLContentInterface | null;
	order: GeneralAllSMSListTableHeadOrder;
	orderBy: GeneralAllSMSListTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface GeneralAllSMSListTableBodyCellInterface {
	column: GeneralAllSMSListTableColumnInterface;
	smsItem: ASLDataInterface;
}

export interface GeneralAllSMSListTableColumnInterface {
	id: GeneralAllSMSListTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: GeneralAllSMSListTableHeadAlignment;
	noSort?: boolean;
	padding?: string;
}

export type GeneralAllSMSListTableHeadOrder = 'asc' | 'desc';
export type GeneralAllSMSListTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
