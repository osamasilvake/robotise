import {
	SRTContentDataInterface,
	SRTContentSafetySensorsState,
	SRTContentSafetySystemsState
} from '../../../../../../slices/robots/RobotTwins.slice.interface';
import { RobotDetailSafetyTableColumnsTypeEnum } from './RobotDetailSafety.enum';

export interface RobotDetailSafetyInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailSafetySensorsInterface {
	sensors?: SRTContentSafetySensorsState | undefined;
}

export interface RobotDetailSafetySystemsInterface {
	systems?: SRTContentSafetySystemsState | undefined;
}

export interface RobotDetailSafetyColumnInterface {
	id: RobotDetailSafetyTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: RobotDetailSafetyTableHeadAlignment;
}

export type RobotDetailSafetyTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
