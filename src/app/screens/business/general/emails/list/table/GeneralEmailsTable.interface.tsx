import { MouseEvent } from 'react';

import {
	SECDataInterface,
	SEContentInterface
} from '../../../../../../slices/business/general/emails/Emails.slice.interface';
import { GeneralEmailsTableColumnsTypeEnum } from './GeneralEmailsTable.enum';

export interface GeneralEmailsTableInterface {
	content: SEContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface GeneralEmailsTableHeadInterface {
	columns: GeneralEmailsTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: GeneralEmailsTableColumnsTypeEnum) => void;
	order: GeneralEmailsTableHeadOrder;
	orderBy: GeneralEmailsTableColumnsTypeEnum;
}

export interface GeneralEmailsTableBodyInterface {
	content: SEContentInterface | null;
	order: GeneralEmailsTableHeadOrder;
	orderBy: GeneralEmailsTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface GeneralEmailsTableBodyCellInterface {
	column: GeneralEmailsTableColumnInterface;
	email: SECDataInterface;
}

export interface GeneralEmailsTableColumnInterface {
	id: GeneralEmailsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: GeneralEmailsTableHeadAlignment;
	noSort?: boolean;
}

export type GeneralEmailsTableHeadOrder = 'asc' | 'desc';
export type GeneralEmailsTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
