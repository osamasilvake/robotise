import {
	SRTContentActivityState,
	SRTContentBatteryStateInterface,
	SRTContentDataInterface,
	SRTContentDockingStateInterface,
	SRTContentJoystickState
} from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotDetailStatesInterface {
	robotTwin: SRTContentDataInterface;
}

export interface RobotDetailStateInterface {
	robotTwin: SRTContentDataInterface;
	state: RobotDetailStateInfoInterface;
}

export interface RobotDetailStateInfoInterface {
	title: string;
	type: string;
	content:
		| SRTContentBatteryStateInterface
		| SRTContentDockingStateInterface
		| SRTContentJoystickState
		| SRTContentActivityState
		| undefined;
}

export interface RobotDetailStateCardInterface {
	title: string | undefined;
	value: string | undefined;
	date: string | undefined;
	icon?: string | undefined;
}
