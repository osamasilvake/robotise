import { MouseEvent } from 'react';

import {
	APCContentInterface,
	APCDataInterface
} from '../../../../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice.interface';
import { GeneralAllPhoneCallsTableColumnsTypeEnum } from './GeneralAllPhoneCallsTable.enum';

export interface GeneralAllPhoneCallsTableInterface {
	content: APCContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface GeneralAllPhoneCallsTableHeadInterface {
	columns: GeneralAllPhoneCallsTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: GeneralAllPhoneCallsTableColumnsTypeEnum) => void;
	order: GeneralAllPhoneCallsTableHeadOrder;
	orderBy: GeneralAllPhoneCallsTableColumnsTypeEnum;
}

export interface GeneralAllPhoneCallsTableBodyInterface {
	content: APCContentInterface | null;
	order: GeneralAllPhoneCallsTableHeadOrder;
	orderBy: GeneralAllPhoneCallsTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface GeneralAllPhoneCallsTableBodyCellInterface {
	column: GeneralAllPhoneCallsTableColumnInterface;
	phoneCall: APCDataInterface;
}

export interface GeneralAllPhoneCallsTableColumnInterface {
	id: GeneralAllPhoneCallsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: GeneralAllPhoneCallsTableHeadAlignment;
	noSort?: boolean;
	padding?: string;
}

export type GeneralAllPhoneCallsTableHeadOrder = 'asc' | 'desc';
export type GeneralAllPhoneCallsTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
