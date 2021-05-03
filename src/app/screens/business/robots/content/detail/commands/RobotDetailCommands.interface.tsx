import { SliceRobotInterface } from '../../../../../../slices/robot/Robot.slice.interface';
import { SRTContentDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotDetailCommandsInterface {
	robotTwin: SRTContentDataInterface;
}

export interface RobotDetailCommandsStateInterface {
	control: boolean;
	forward: boolean;
	backward: boolean;
	rotate: boolean;
	translate: boolean;
}

export interface RobotDetailCommandControlInterface {
	robotTwin: SRTContentDataInterface;
	robot: SliceRobotInterface;
	state: RobotDetailCommandsStateInterface;
}

export interface RobotDetailCommandMuteSensorsInterface {
	state: RobotDetailCommandsStateInterface;
}

export interface RobotDetailCommandActionsInterface {
	state: RobotDetailCommandsStateInterface;
}
