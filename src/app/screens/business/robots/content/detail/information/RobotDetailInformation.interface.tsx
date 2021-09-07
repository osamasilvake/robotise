import {
	SRTContentComputerInfo,
	SRTContentDataInterface,
	SRTContentHumanPerception,
	SRTContentSafetySensors,
	SRTContentSafetySystems
} from '../../../../../../slices/business/robots/RobotTwins.slice.interface';

export interface RobotDetailInformationInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailSafetySensorsInterface {
	sensors?: SRTContentSafetySensors | undefined;
}

export interface RobotDetailSafetySystemsInterface {
	systems?: SRTContentSafetySystems | undefined;
}

export interface RobotDetailComputerInfoInterface {
	computerInfo?: SRTContentComputerInfo | undefined;
}

export interface RobotDetailHumanPerceptionInterface {
	humanPerception?: SRTContentHumanPerception | undefined;
}
