import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	SMCContentInterface,
	SMCDataInterface
} from '../../../../../slices/settings/middleware-config/MiddlewareConfig.interface';
import {
	MiddlewareConfigCreateEditTypeEnum,
	MiddlewareConfigTableColumnsTypeEnum
} from './MiddlewareConfigTable.enum';

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
	config: SMCDataInterface;
	column: MiddlewareConfigTableColumnInterface;
}

export interface DialogCreateEditMiddlewareConfigInterface {
	config?: SMCDataInterface | null;
	type: MiddlewareConfigCreateEditTypeEnum;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogCreateEditMiddlewareConfigFormInterface {
	name: string;
	desc: string;
	key: string;
	prop: string;
	direction: string;
	status: string;
	traceMode: string;
	debug?: boolean;
	audit?: boolean;
	stopPropagate?: boolean;
	saveHistory?: boolean;
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
