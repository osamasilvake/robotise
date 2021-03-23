import { RTSMappedResponseDataInterface } from '../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotContentDetailInterface {
	robot: RTSMappedResponseDataInterface;
}

export interface RobotContentDetailGeneralParamsInterface {
	id: string;
}

export interface RobotContentDetailStateItemInterface {
	state:
		| {
				title: string;
				value: string;
				date: string;
				icon?: string;
		  }
		| undefined;
}
