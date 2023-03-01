import { MouseEvent } from 'react';

import {
	PCCDataInterface,
	PCContentInterface
} from '../../../../../../../slices/business/sites/phone-calls/PhoneCalls.slice.interface';
import { SitePhoneCallsTableColumnsTypeEnum } from './SitePhoneCallsTable.enum';

export interface SitePhoneCallsTableInterface {
	content: PCContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface SitePhoneCallsTableHeadInterface {
	columns: SitePhoneCallsTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: SitePhoneCallsTableColumnsTypeEnum) => void;
	order: SitePhoneCallsTableHeadOrder;
	orderBy: SitePhoneCallsTableColumnsTypeEnum;
}

export interface SitePhoneCallsTableBodyInterface {
	content: PCContentInterface | null;
	order: SitePhoneCallsTableHeadOrder;
	orderBy: SitePhoneCallsTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface SitePhoneCallsTableBodyCellInterface {
	column: SitePhoneCallsTableColumnInterface;
	phoneCall: PCCDataInterface;
}

export interface SitePhoneCallsTableColumnInterface {
	id: SitePhoneCallsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: SitePhoneCallsTableHeadAlignment;
	noSort?: boolean;
	padding?: string;
}

export type SitePhoneCallsTableHeadOrder = 'asc' | 'desc';
export type SitePhoneCallsTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
