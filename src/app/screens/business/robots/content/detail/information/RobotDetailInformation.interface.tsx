import {
	SRTContentComputerInfoState,
	SRTContentDataInterface,
	SRTContentSafetySensorsState,
	SRTContentSafetySystemsState
} from '../../../../../../slices/business/robots/RobotTwins.slice.interface';

export interface RobotDetailInformationInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailSafetySensorsInterface {
	sensors?: SRTContentSafetySensorsState | undefined;
}

export interface RobotDetailSafetySystemsInterface {
	systems?: SRTContentSafetySystemsState | undefined;
}

export interface RobotDetailComputerInfoInterface {
	computerInfo?: SRTContentComputerInfoState | undefined;
}
