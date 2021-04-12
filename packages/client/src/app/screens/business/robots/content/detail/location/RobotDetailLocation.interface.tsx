import { Dispatch, SetStateAction } from 'react';

import {
	RTSLocationInterface,
	RTSMappedResponseDataInterface
} from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotDetailLocationInterface {
	robot: RTSMappedResponseDataInterface;
}

export interface RobotDetailLocationCardInterface {
	robot: RTSMappedResponseDataInterface;
	grid: boolean;
}

export interface RobotDetailLocationInfoInterface {
	location: RTSLocationInterface | undefined;
	grid: boolean;
	showGrid: Dispatch<SetStateAction<boolean>>;
}

export interface RobotDetailLocationCardIconInterface {
	pointCoords: PointCoords;
}

export interface PointCoords {
	x: number;
	y: number;
	yaw: number;
}
