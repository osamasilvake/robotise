import { MouseEvent } from 'react';

import {
	SMCContentInterface,
	SMCDataInterface
} from '../../../../../slices/settings/middleware-config/MiddlewareConfig.interface';
import { MiddlewareConfigTableColumnsTypeEnum } from './MiddlewareConfigTable.enum';

export interface MiddlewareConfigTableInterface {
	content: SMCContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface MiddlewareConfigTableHeadInterface {
	columns: MiddlewareConfigTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: MiddlewareConfigTableColumnsTypeEnum) => void;
	order: MiddlewareConfigTableHeadOrder;
	orderBy: MiddlewareConfigTableColumnsTypeEnum;
}

export interface MiddlewareConfigTableBodyInterface {
	content: SMCContentInterface | null;
	order: MiddlewareConfigTableHeadOrder;
	orderBy: MiddlewareConfigTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface MiddlewareConfigTableBodyCellInterface {
	messageConfig: SMCDataInterface;
	column: MiddlewareConfigTableColumnInterface;
}

export interface MiddlewareConfigTableColumnInterface {
	id: MiddlewareConfigTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: MiddlewareConfigTableHeadAlignment;
	noSort?: boolean;
}

export type MiddlewareConfigTableHeadOrder = 'asc' | 'desc';
export type MiddlewareConfigTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
