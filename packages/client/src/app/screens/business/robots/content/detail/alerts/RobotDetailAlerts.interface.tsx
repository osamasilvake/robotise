import {
	IAlert,
	SRTContentDataInterface
} from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';

export interface RobotDetailAlertsInterface {
	robot: SRTContentDataInterface;
}

export interface RobotDetailAlertInterface {
	alert: IAlert;
}

export interface RobotDetailAlertCardInterface {
	alert: IAlert;
}
