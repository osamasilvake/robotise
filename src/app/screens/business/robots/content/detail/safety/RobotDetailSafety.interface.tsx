import {
	SRTContentDataInterface,
	SRTContentSafetySensorsState,
	SRTContentSafetySystemsState
} from '../../../../../../slices/robots/RobotTwins.slice.interface';

export interface RobotDetailSafetyInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailSafetySensorsInterface {
	sensors?: SRTContentSafetySensorsState | undefined;
}

export interface RobotDetailSafetySystemsInterface {
	systems?: SRTContentSafetySystemsState | undefined;
}
