import { Dispatch, SetStateAction } from 'react';

import {
	SRTContentDataInterface,
	SRTContentLocationInterface
} from '../../../../../../slices/business/robots/RobotTwins.slice.interface';
import { RobotDetailLocationHumanLegTypeEnum } from './RobotDetailLocation.enum';

export interface RobotDetailLocationInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailLocationCardInterface {
	robotTwins: SRTContentDataInterface;
	grid: boolean;
	plannedPath: boolean;
}

export interface RobotDetailLocationInfoInterface {
	location: SRTContentLocationInterface | undefined;
	grid: boolean;
	setGrid: Dispatch<SetStateAction<boolean>>;
	plannedPath: boolean;
	setPlannedPath: Dispatch<SetStateAction<boolean>>;
}

export interface RobotDetailLocationCardRobotIconInterface {
	robotCoords: RobotDetailLocationCardRobotIconCoords;
	plannedPath: boolean;
	activePoints: boolean;
}

export interface RobotDetailLocationCardRobotIconCoords {
	x: number;
	y: number;
	yaw: number;
}

export interface RobotDetailLocationCardPlannedPathInterface {
	ratio: RobotDetailLocationCardRatioInterface;
	plannedPathCoords: RobotDetailLocationCardPlannedPathCoordsInterface[];
}

export interface RobotDetailLocationCardRatioInterface {
	x: number;
	y: number;
	cx: number;
	cy: number;
}

export interface RobotDetailLocationCardPlannedPathCoordsInterface {
	x: number;
	y: number;
}

export interface RobotDetailLocationCardHumanIconInterface {
	humanCoords: RobotDetailLocationCardHumanIconCoordsInterface[];
}

export interface RobotDetailLocationCardHumanIconCoordsInterface {
	x: number;
	y: number;
	type: RobotDetailLocationHumanLegTypeEnum;
}
