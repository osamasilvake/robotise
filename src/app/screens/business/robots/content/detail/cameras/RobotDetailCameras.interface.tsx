import { Dispatch, SetStateAction } from 'react';

import { SRTContentDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import { RobotDetailCameraTypeEnum } from './RobotDetailCameras.enum';

export interface RobotDetailCamerasInterface {
	robotTwin: SRTContentDataInterface;
	loading: boolean;
}

export interface RobotDetailCameraInterface {
	robotTwin: SRTContentDataInterface;
	loading: boolean;
	cameraType: RobotDetailCameraTypeEnum;
	currentCameraType: RobotDetailCameraTypeEnum;
	setCurrentCameraType: Dispatch<SetStateAction<RobotDetailCameraTypeEnum>>;
}
