import {
	RTSActivityState,
	RTSBatteryStateInterface,
	RTSDockingStateInterface,
	RTSEmergencyStateInterface,
	RTSJoystickState,
	RTSLidarState,
	RTSMappedResponseDataInterface,
	RTSMotorWheelState,
	RTSRealsenseState
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
		| RTSEmergencyStateInterface
		| RTSMotorWheelState
		| RTSJoystickState
		| RTSLidarState
		| RTSRealsenseState
		| RTSActivityState
		| undefined;
}

export interface RobotContentDetailStateCardInterface {
	title: string | undefined;
	value: string | undefined;
	date: string | undefined;
	icon?: string | undefined;
}
