import {
	RTSLocationInterface,
	RTSMappedResponseDataInterface
} from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotContentDetailLocationInterface {
	robot: RTSMappedResponseDataInterface;
}

export interface RobotContentDetailLocationCardInterface {
	robot: RTSMappedResponseDataInterface;
}

export interface RobotContentDetailLocationInfoInterface {
	location: RTSLocationInterface | undefined;
}

export interface RobotContentDetailLocationCardIconInterface {
	pointCoords: PointCoords;
}

export interface PointCoords {
	x: number;
	y: number;
	yaw: number;
}
