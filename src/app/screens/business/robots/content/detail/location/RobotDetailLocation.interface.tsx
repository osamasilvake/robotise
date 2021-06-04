import { Dispatch, SetStateAction } from 'react';

import {
	SRTContentDataInterface,
	SRTContentLocationInterface
} from '../../../../../../slices/robots/RobotTwins.slice.interface';

export interface RobotDetailLocationInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailLocationCardInterface {
	robotTwins: SRTContentDataInterface;
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
