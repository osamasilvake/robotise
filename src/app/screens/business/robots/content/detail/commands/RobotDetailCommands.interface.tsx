import { MouseEventHandler } from 'react';

import { SliceRobotInterface } from '../../../../../../slices/robot/Robot.slice.interface';
import { SRTContentDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import {
	RobotDetailCommandsMuteSensorsTypeEnum,
	RobotDetailCommandsTypeEnum,
	RobotDetailControlModeTypeEnum
} from './RobotDetailCommands.enum';

export interface RobotDetailCommandsInterface {
	robotTwin: SRTContentDataInterface;
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
	robotTwin: SRTContentDataInterface;
	robot: SliceRobotInterface;
	state: RobotDetailCommandsStateInterface;
	sendControlCommand: (
		payload: RobotDetailCommandsPayloadInterface
	) => MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface RobotDetailCommandMuteSensorsInterface {
	robot: SliceRobotInterface;
	state: RobotDetailCommandsStateInterface;
	sendControlCommand: (
		payload: RobotDetailCommandsPayloadInterface
	) => MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface RobotDetailCommandActionsInterface {
	robot: SliceRobotInterface;
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
