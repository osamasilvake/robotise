import {
	IAlert,
	RTSMappedResponseDataInterface
} from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotContentDetailAlertsInterface {
	robot: RTSMappedResponseDataInterface;
}

export interface RobotContentDetailAlertInterface {
	alert: IAlert;
}

export interface RobotContentDetailAlertCardInterface {
	alert: IAlert;
}
