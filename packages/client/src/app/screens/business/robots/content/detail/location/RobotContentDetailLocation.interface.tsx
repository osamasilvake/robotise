import { Dispatch, SetStateAction } from 'react';

import {
	RTSLocationInterface,
	RTSMappedResponseDataInterface
} from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotContentDetailLocationInterface {
	robot: RTSMappedResponseDataInterface;
}

export interface RobotContentDetailLocationCardInterface {
	robot: RTSMappedResponseDataInterface;
	grid: boolean;
}

export interface RobotContentDetailLocationInfoInterface {
	location: RTSLocationInterface | undefined;
	grid: boolean;
	showGrid: Dispatch<SetStateAction<boolean>>;
}

export interface RobotContentDetailLocationCardIconInterface {
	pointCoords: PointCoords;
}

export interface PointCoords {
	x: number;
	y: number;
	yaw: number;
}
