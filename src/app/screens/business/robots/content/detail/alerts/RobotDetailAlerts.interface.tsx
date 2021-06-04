import {
	IAlert,
	SRTContentDataInterface
} from '../../../../../../slices/robots/RobotTwins.slice.interface';

export interface RobotDetailAlertsInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailAlertInterface {
	alert: IAlert;
}

export interface RobotDetailAlertCardInterface {
	alert: IAlert;
}
