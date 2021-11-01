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

export interface RobotDetailLocationCardPlannedPathInterface {
	plannedPathCoords: RobotDetailLocationCardPlannedPathIconCoordsInterface[];
}

export interface RobotDetailLocationCardPlannedPathIconCoordsInterface {
	x: number;
	y: number;
}
