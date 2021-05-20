import { MouseEvent } from 'react';

import {
	SPCDataInterface,
	SPContentInterface
} from '../../../../../../../slices/products/Products.slice.interface';
import { SiteProductsTableColumnsTypeEnum } from './SiteProductsTable.enum';

export interface SiteProductsTableInterface {
	content: SPContentInterface | null;
}

export interface SiteProductsTableHeadInterface {
	columns: SiteProductsTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: SiteProductsTableColumnsTypeEnum) => void;
	order: SiteProductsTableHeadOrder;
	orderBy: SiteProductsTableColumnsTypeEnum;
}

export interface SiteProductsTableColumnInterface {
	id: SiteProductsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: SiteProductsTableHeadAlignment;
}

export interface SiteProductsTableBodyInterface {
	content: SPContentInterface | null;
	order: SiteProductsTableHeadOrder;
	orderBy: SiteProductsTableColumnsTypeEnum;
}

export interface SiteProductsTableBodyCellInterface {
	column: SiteProductsTableColumnInterface;
	order: SPCDataInterface;
}

export type SiteProductsTableHeadOrder = 'asc' | 'desc';
export type SiteProductsTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
