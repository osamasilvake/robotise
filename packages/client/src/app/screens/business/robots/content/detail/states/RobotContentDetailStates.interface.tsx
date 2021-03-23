import {
	RTSBatteryStateInterface,
	RTSDockingStateInterface,
	RTSEmergencyStateInterface,
	RTSMappedResponseDataInterface,
	RTSMotorWheelState
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
		| undefined;
}

export interface RobotContentDetailStateCardInterface {
	valueTop: string | undefined;
	valueMiddle: string | undefined;
	valueBottom: string | undefined;
	icon?: string | undefined;
}
