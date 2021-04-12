import { Dispatch, SetStateAction } from 'react';

import { RTSMappedResponseDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import { RobotDetailCameraTypeEnum } from './RobotDetailCameras.enum';

export interface RobotDetailCamerasInterface {
	robot: RTSMappedResponseDataInterface;
	loading: boolean;
}

export interface RobotDetailCameraInterface {
	robot: RTSMappedResponseDataInterface;
	loading: boolean;
	cameraType: RobotDetailCameraTypeEnum;
	currentCameraType: RobotDetailCameraTypeEnum;
	setCurrentCameraType: Dispatch<SetStateAction<RobotDetailCameraTypeEnum>>;
}
