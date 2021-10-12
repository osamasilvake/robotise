import { MouseEvent } from 'react';

import {
	PCCDataInterface,
	PCContentInterface
} from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';
import { SitePhoneConfigsTableColumnsTypeEnum } from './SitePhoneConfigsTable.enum';

export interface SitePhoneConfigsTableInterface {
	content: PCContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface SitePhoneConfigsTableHeadInterface {
	columns: SitePhoneConfigsTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: SitePhoneConfigsTableColumnsTypeEnum) => void;
	order: SitePhoneConfigsTableHeadOrder;
	orderBy: SitePhoneConfigsTableColumnsTypeEnum;
}

export interface SitePhoneConfigsTableBodyInterface {
	content: PCContentInterface | null;
	order: SitePhoneConfigsTableHeadOrder;
	orderBy: SitePhoneConfigsTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface SitePhoneConfigsTableBodyCellInterface {
	column: SitePhoneConfigsTableColumnInterface;
	phoneConfig: PCCDataInterface;
}

export interface SitePhoneConfigsTableColumnInterface {
	id: SitePhoneConfigsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: SitePhoneConfigsTableHeadAlignment;
	noSort?: boolean;
}

export type SitePhoneConfigsTableHeadOrder = 'asc' | 'desc';
export type SitePhoneConfigsTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
