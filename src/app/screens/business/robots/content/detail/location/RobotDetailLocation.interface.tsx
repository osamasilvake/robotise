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
}

export interface RobotDetailLocationInfoInterface {
	location: SRTContentLocationInterface | undefined;
	grid: boolean;
	showGrid: Dispatch<SetStateAction<boolean>>;
}

export interface RobotDetailLocationCardRobotIconInterface {
	robotCoords: RobotDetailLocationCardRobotIconCoords;
	goalReached: boolean;
}

export interface RobotDetailLocationCardRatioInterface {
	x: number;
	y: number;
	cx: number;
	cy: number;
}

export interface RobotDetailLocationCardPlannedPathInterface {
	plannedPathCoords: RobotDetailLocationCardPlannedPathCoordsInterface[];
	ratio: RobotDetailLocationCardRatioInterface;
}

export interface RobotDetailLocationCardPlannedPathCoordsInterface {
	x: number;
	y: number;
}

export interface RobotDetailLocationCardRobotIconCoords {
	x: number;
	y: number;
	yaw: number;
}

export interface RobotDetailLocationCardHumanIconInterface {
	humanCoords: RobotDetailLocationCardHumanIconCoordsInterface[];
}

export interface RobotDetailLocationCardHumanIconCoordsInterface {
	x: number;
	y: number;
	type: RobotDetailLocationHumanLegTypeEnum;
}
