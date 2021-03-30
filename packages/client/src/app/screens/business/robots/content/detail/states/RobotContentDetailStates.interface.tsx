import {
	RTSActivityState,
	RTSBatteryStateInterface,
	RTSDockingStateInterface,
	RTSJoystickState,
	RTSMappedResponseDataInterface
} from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotContentDetailStatesInterface {
	robot: RTSMappedResponseDataInterface;
}

export interface RobotContentDetailStateInterface {
	robot: RTSMappedResponseDataInterface;
	state: RobotContentDetailStateInfoInterface;
}

export interface RobotContentDetailStateInfoInterface {
	title: string;
	type: string;
	content:
		| RTSBatteryStateInterface
		| RTSDockingStateInterface
		| RTSJoystickState
		| RTSActivityState
		| undefined;
}

export interface RobotContentDetailStateCardInterface {
	title: string | undefined;
	value: string | undefined;
	date: string | undefined;
	icon?: string | undefined;
}
