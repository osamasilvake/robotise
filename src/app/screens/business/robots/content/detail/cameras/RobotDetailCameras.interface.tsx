import { Dispatch, SetStateAction } from 'react';

import { SRTContentDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import { RobotDetailCameraTypeEnum } from './RobotDetailCameras.enum';

export interface RobotDetailCamerasInterface {
	robot: SRTContentDataInterface;
	loading: boolean;
}

export interface RobotDetailCameraInterface {
	robot: SRTContentDataInterface;
	loading: boolean;
	cameraType: RobotDetailCameraTypeEnum;
	currentCameraType: RobotDetailCameraTypeEnum;
	setCurrentCameraType: Dispatch<SetStateAction<RobotDetailCameraTypeEnum>>;
}
