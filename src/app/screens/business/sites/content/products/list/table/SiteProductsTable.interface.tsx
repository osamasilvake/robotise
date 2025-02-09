import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	SPCDataInterface,
	SPContentInterface
} from '../../../../../../../slices/business/sites/products/Products.slice.interface';
import {
	SiteProductCreateEditTypeEnum,
	SiteProductsTableColumnsTypeEnum
} from './SiteProductsTable.enum';

export interface SiteProductsTableInterface {
	content: SPContentInterface | null;
}

export interface SiteProductsTableHeadInterface {
	columns: SiteProductsTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: SiteProductsTableColumnsTypeEnum) => void;
	order: SiteProductsTableHeadOrder;
	orderBy: SiteProductsTableColumnsTypeEnum;
}

export interface SiteProductsTableBodyInterface {
	content: SPContentInterface | null;
	order: SiteProductsTableHeadOrder;
	orderBy: SiteProductsTableColumnsTypeEnum;
}

export interface SiteProductsTableBodyCellInterface {
	column: SiteProductsTableColumnInterface;
	product: SPCDataInterface;
}

export interface DialogCreateEditProductInterface {
	product?: SPCDataInterface | null;
	type: SiteProductCreateEditTypeEnum;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogCreateEditProductFormInterface {
	image: string;
	name: string;
	price: number | string;
	length: number | string | null;
	weight: number | string | null;
	volume: string;
	category: string;
}

export interface DialogDeleteProductInterface {
	product: SPCDataInterface;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface SiteProductsTableColumnInterface {
	id: SiteProductsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: SiteProductsTableHeadAlignment;
	noSort?: boolean;
	padding?: string;
}

export type SiteProductsTableHeadOrder = 'asc' | 'desc';
export type SiteProductsTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
