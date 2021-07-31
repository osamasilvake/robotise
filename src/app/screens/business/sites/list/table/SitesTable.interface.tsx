import { MouseEvent } from 'react';

import {
	ISite,
	SSContentInterface
} from '../../../../../slices/business/sites/Sites.slice.interface';
import { SitesTableColumnsTypeEnum } from './SitesTable.enum';

export interface SitesTableInterface {
	content: SSContentInterface | null;
}

export interface SitesTableHeadInterface {
	columns: SitesTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: SitesTableColumnsTypeEnum) => void;
	order: SitesTableHeadOrder;
	orderBy: SitesTableColumnsTypeEnum;
}

export interface SitesTableBodyInterface {
	content: SSContentInterface | null;
	order: SitesTableHeadOrder;
	orderBy: SitesTableColumnsTypeEnum;
}

export interface SitesTableBodyCellInterface {
	column: SitesTableColumnInterface;
	site: ISite;
}

export interface SitesTableColumnInterface {
	id: SitesTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: SitesTableHeadAlignment;
}

export type SitesTableHeadOrder = 'asc' | 'desc';
export type SitesTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
