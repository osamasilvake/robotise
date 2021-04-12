import {
	IAlert,
	RTSMappedResponseDataInterface
} from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotDetailAlertsInterface {
	robot: RTSMappedResponseDataInterface;
}

export interface RobotDetailAlertInterface {
	alert: IAlert;
}

export interface RobotDetailAlertCardInterface {
	alert: IAlert;
}
