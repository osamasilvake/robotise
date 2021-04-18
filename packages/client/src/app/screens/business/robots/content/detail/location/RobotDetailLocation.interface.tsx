import { Dispatch, SetStateAction } from 'react';

import {
	SRTContentDataInterface,
	SRTContentLocationInterface
} from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotDetailLocationInterface {
	robot: SRTContentDataInterface;
}

export interface RobotDetailLocationCardInterface {
	robot: SRTContentDataInterface;
	grid: boolean;
}

export interface RobotDetailLocationInfoInterface {
	location: SRTContentLocationInterface | undefined;
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
