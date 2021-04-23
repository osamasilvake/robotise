import { Dispatch, SetStateAction } from 'react';

import { SRTContentDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import { RobotDetailCameraTypeEnum } from './RobotDetailCameras.enum';

export interface RobotDetailCamerasInterface {
	robotTwin: SRTContentDataInterface;
}

export interface RobotDetailCameraInterface {
	robotTwin: SRTContentDataInterface;
	cameraType: RobotDetailCameraTypeEnum;
	currentCameraType: RobotDetailCameraTypeEnum;
	setCurrentCameraType: Dispatch<SetStateAction<RobotDetailCameraTypeEnum>>;
}
