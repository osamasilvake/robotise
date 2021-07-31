import { Dispatch, SetStateAction } from 'react';

import { SRTContentDataInterface } from '../../../../../../slices/business/robots/RobotTwins.slice.interface';
import { RobotDetailCameraTypeEnum } from './RobotDetailCameras.enum';

export interface RobotDetailCamerasInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailCameraInterface {
	robotTwins: SRTContentDataInterface;
	cameraType: RobotDetailCameraTypeEnum;
	currentCameraType: RobotDetailCameraTypeEnum;
	setCurrentCameraType: Dispatch<SetStateAction<RobotDetailCameraTypeEnum>>;
}
