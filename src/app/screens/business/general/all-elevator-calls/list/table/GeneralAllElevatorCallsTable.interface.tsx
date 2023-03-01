import { MouseEvent } from 'react';

import {
	AECContentInterface,
	AECDataInterface
} from '../../../../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice.interface';
import { GeneralAllElevatorCallsTableColumnsTypeEnum } from './GeneralAllElevatorCallsTable.enum';

export interface GeneralAllElevatorCallsTableInterface {
	content: AECContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface GeneralAllElevatorCallsTableHeadInterface {
	columns: GeneralAllElevatorCallsTableColumnInterface[];
	onRequestSort: (
		event: MouseEvent,
		property: GeneralAllElevatorCallsTableColumnsTypeEnum
	) => void;
	order: GeneralAllElevatorCallsTableHeadOrder;
	orderBy: GeneralAllElevatorCallsTableColumnsTypeEnum;
}

export interface GeneralAllElevatorCallsTableBodyInterface {
	content: AECContentInterface | null;
	order: GeneralAllElevatorCallsTableHeadOrder;
	orderBy: GeneralAllElevatorCallsTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface GeneralAllElevatorCallsTableBodyCellInterface {
	index: number;
	column: GeneralAllElevatorCallsTableColumnInterface;
	elevatorCall: AECDataInterface;
}

export interface GeneralAllElevatorCallsTableColumnInterface {
	id: GeneralAllElevatorCallsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: GeneralAllElevatorCallsTableHeadAlignment;
	noSort?: boolean;
	padding?: string;
}

export type GeneralAllElevatorCallsTableHeadOrder = 'asc' | 'desc';
export type GeneralAllElevatorCallsTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
