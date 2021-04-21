import { Dispatch, SetStateAction } from 'react';

import {
	SRTContentDataInterface,
	SRTContentLocationInterface
} from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotDetailLocationInterface {
	robotTwin: SRTContentDataInterface;
}

export interface RobotDetailLocationCardInterface {
	robotTwin: SRTContentDataInterface;
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
