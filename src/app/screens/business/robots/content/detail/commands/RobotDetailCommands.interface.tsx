import { MouseEventHandler } from 'react';

import { SliceRobotOperationsInterface } from '../../../../../../slices/business/robots/RobotOperations.slice.interface';
import { SRTContentDataInterface } from '../../../../../../slices/business/robots/RobotTwins.slice.interface';
import {
	RobotDetailCommandsMuteSensorsTypeEnum,
	RobotDetailCommandsTypeEnum,
	RobotDetailControlModeTypeEnum
} from './RobotDetailCommands.enum';

export interface RobotDetailCommandsInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailCommandsStateInterface {
	ready: boolean;
	control: boolean;
	forward: boolean;
	backward: boolean;
	rotate: boolean;
	translate: boolean;
}

export interface RobotDetailCommandsPayloadInterface {
	command: RobotDetailCommandsTypeEnum;
	state?: RobotDetailControlModeTypeEnum | RobotDetailCommandsMuteSensorsTypeEnum | number;
}

export interface RobotDetailCommandControlInterface {
	robotTwins: SRTContentDataInterface;
	robotOperations: SliceRobotOperationsInterface;
	state: RobotDetailCommandsStateInterface;
	sendControlCommand: (
		payload: RobotDetailCommandsPayloadInterface
	) => MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface RobotDetailCommandMuteSensorsInterface {
	robotOperations: SliceRobotOperationsInterface;
	state: RobotDetailCommandsStateInterface;
	sendControlCommand: (
		payload: RobotDetailCommandsPayloadInterface
	) => MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface RobotDetailCommandActionsInterface {
	robotOperations: SliceRobotOperationsInterface;
	state: RobotDetailCommandsStateInterface;
	sendControlCommand: (
		payload: RobotDetailCommandsPayloadInterface
	) => MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface RobotDetailCommandsStateOptionInterface {
	mode?: string | number;
	state?: string | number;
	angle?: string | number;
	distance?: string | number;
}
