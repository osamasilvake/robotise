import { Dispatch, MouseEvent, SetStateAction } from 'react';

import {
	ECCDataInterface,
	ECContentInterface
} from '../../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice.interface';
import { RobotElevatorCallsTableColumnsTypeEnum } from './RobotElevatorCallsTable.enum';

export interface RobotElevatorCallsTableInterface {
	content: ECContentInterface | null;
	page: number;
	rowsPerPage: number;
}

export interface RobotElevatorCallsTableHeadInterface {
	columns: RobotElevatorCallsTableColumnInterface[];
	onRequestSort: (event: MouseEvent, property: RobotElevatorCallsTableColumnsTypeEnum) => void;
	order: RobotElevatorCallsTableHeadOrder;
	orderBy: RobotElevatorCallsTableColumnsTypeEnum;
}

export interface RobotElevatorCallsTableBodyInterface {
	content: ECContentInterface | null;
	order: RobotElevatorCallsTableHeadOrder;
	orderBy: RobotElevatorCallsTableColumnsTypeEnum;
	page: number;
	rowsPerPage: number;
}

export interface RobotElevatorCallsTableBodyCellInterface {
	index: number;
	column: RobotElevatorCallsTableColumnInterface;
	elevatorCall: ECCDataInterface;
}

export interface RobotElevatorCallsTableColumnInterface {
	id: RobotElevatorCallsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotElevatorCallsTableHeadAlignment;
	noSort?: boolean;
	padding?: string;
}

export type RobotElevatorCallsTableHeadOrder = 'asc' | 'desc';
export type RobotElevatorCallsTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';

export interface DialogElevatorCallsManualTestInterface {
	open: number;
	setOpen: Dispatch<SetStateAction<number>>;
	elevatorCall: ECCDataInterface;
}

export interface DialogElevatorCallsManualTestFormInterface {
	liftId: string;
}
