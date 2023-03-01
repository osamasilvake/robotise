import { MouseEvent } from 'react';

import {
	SLCDataInterface,
	SLContentInterface
} from '../../../../../../slices/business/sites/sms-list/SMSList.slice.interface';
import { SiteSMSListTableColumnsTypeEnum } from './SiteSMSListTable.enum';

export interface SiteSMSListTableInterface {
	content: SLContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface SiteSMSListTableHeadInterface {
	columns: SiteSMSListTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: SiteSMSListTableColumnsTypeEnum) => void;
	order: SiteSMSListTableHeadOrder;
	orderBy: SiteSMSListTableColumnsTypeEnum;
}

export interface SiteSMSListTableBodyInterface {
	content: SLContentInterface | null;
	order: SiteSMSListTableHeadOrder;
	orderBy: SiteSMSListTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface SiteSMSListTableBodyCellInterface {
	column: SiteSMSListTableColumnInterface;
	smsItem: SLCDataInterface;
}

export interface SiteSMSListTableColumnInterface {
	id: SiteSMSListTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: SiteSMSListTableHeadAlignment;
	noSort?: boolean;
	padding?: string;
}

export type SiteSMSListTableHeadOrder = 'asc' | 'desc';
export type SiteSMSListTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
