import { MouseEvent } from 'react';

import {
	SDLContentInterface,
	SDLDataInterface
} from '../../../../../slices/settings/deep-links/DeepLinks.interface';
import { DeepLinksTableColumnsTypeEnum } from './DeepLinksTable.enum';

export interface DeepLinksTableInterface {
	content: SDLContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface DeepLinksTableHeadInterface {
	columns: DeepLinksTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: DeepLinksTableColumnsTypeEnum) => void;
	order: DeepLinksTableHeadOrder;
	orderBy: DeepLinksTableColumnsTypeEnum;
}

export interface DeepLinksTableBodyInterface {
	content: SDLContentInterface | null;
	order: DeepLinksTableHeadOrder;
	orderBy: DeepLinksTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface DeepLinksTableBodyCellInterface {
	deepLink: SDLDataInterface;
	column: DeepLinksTableColumnInterface;
}

export interface DeepLinksTableColumnInterface {
	id: DeepLinksTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: DeepLinksTableHeadAlignment;
}

export type DeepLinksTableHeadOrder = 'asc' | 'desc';
export type DeepLinksTableHeadAlignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
