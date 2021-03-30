import { Dispatch, SetStateAction } from 'react';

import { RTSMappedResponseDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import { RobotContentDetailCameraTypeEnum } from './RobotContentDetailCameras.enum';

export interface RobotContentDetailCamerasInterface {
	robot: RTSMappedResponseDataInterface;
	loading: boolean;
}

export interface RobotContentDetailCameraInterface {
	robot: RTSMappedResponseDataInterface;
	loading: boolean;
	cameraType: RobotContentDetailCameraTypeEnum;
	currentCameraType: RobotContentDetailCameraTypeEnum;
	setCurrentCameraType: Dispatch<SetStateAction<RobotContentDetailCameraTypeEnum>>;
}
