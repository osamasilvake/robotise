import {
	IAlertInterface,
	SRTContentDataInterface
} from '../../../../../../slices/business/robots/RobotTwins.slice.interface';

export interface RobotDetailAlertsInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailAlertInterface {
	alert: IAlertInterface;
}

export interface RobotDetailAlertCardInterface {
	alert: IAlertInterface;
}
