import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	SPCDataInterface,
	SPContentInterface
} from '../../../../../../../slices/products/Products.slice.interface';
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

export interface SiteProductsTableColumnInterface {
	id: SiteProductsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: SiteProductsTableHeadAlignment;
	noSort?: boolean;
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
	product: SPCDataInterface | null;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	type: SiteProductCreateEditTypeEnum;
}

export interface DialogCreateEditProductPayloadInterface {
	image: string;
	name: string;
	price: number | string;
	length: number | string;
	weight: number | string;
	volume: string;
}

export type SiteProductsTableHeadOrder = 'asc' | 'desc';
export type SiteProductsTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
