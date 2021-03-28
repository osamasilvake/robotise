import { RTSMappedResponseDataInterface } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import { RobotContentDetailCameraTypeEnum } from './RobotContentDetailCameras.enum';

export interface RobotContentDetailCamerasInterface {
	robot: RTSMappedResponseDataInterface;
}

export interface RobotContentDetailCameraInterface {
	robot: RTSMappedResponseDataInterface;
	imageType: RobotContentDetailCameraTypeEnum;
}
