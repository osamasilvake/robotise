import {
	RTSActivityState,
	RTSBatteryStateInterface,
	RTSDockingStateInterface,
	RTSJoystickState,
	RTSMappedResponseDataInterface
} from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotDetailStatesInterface {
	robot: RTSMappedResponseDataInterface;
}

export interface RobotDetailStateInterface {
	robot: RTSMappedResponseDataInterface;
	state: RobotDetailStateInfoInterface;
}

export interface RobotDetailStateInfoInterface {
	title: string;
	type: string;
	content:
		| RTSBatteryStateInterface
		| RTSDockingStateInterface
		| RTSJoystickState
		| RTSActivityState
		| undefined;
}

export interface RobotDetailStateCardInterface {
	title: string | undefined;
	value: string | undefined;
	date: string | undefined;
	icon?: string | undefined;
}
