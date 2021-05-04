import { MouseEventHandler } from 'react';

import { SliceRobotInterface } from '../../../../../../slices/robot/Robot.slice.interface';
import { SRTContentDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import {
	RobotDetailCommandsControlTypeEnum,
	RobotDetailCommandsMuteSensorsTypeEnum,
	RobotDetailCommandsTypeEnum
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
	state?: RobotDetailCommandsControlTypeEnum | RobotDetailCommandsMuteSensorsTypeEnum | number;
}

export interface RobotDetailCommandControlInterface {
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
	state: RobotDetailCommandsStateInterface;
	sendControlCommand: (
		payload: RobotDetailCommandsPayloadInterface
	) => MouseEventHandler<HTMLButtonElement> | undefined;
}
