import {
	SRTContentComputerInfoInterface,
	SRTContentDataInterface,
	SRTContentHumanPerceptionInterface,
	SRTContentSafetySensorsInterface,
	SRTContentSafetySystemsInterface,
	SRTContentTransitPointStartedInterface
} from '../../../../../../slices/business/robots/RobotTwins.slice.interface';

export interface RobotDetailInformationInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailSafetySensorsInterface {
	sensors?: SRTContentSafetySensorsInterface | undefined;
}

export interface RobotDetailSafetySystemsInterface {
	systems?: SRTContentSafetySystemsInterface | undefined;
}

export interface RobotDetailComputerInfoInterface {
	computerInfo?: SRTContentComputerInfoInterface | undefined;
}

export interface RobotDetailHumanPerceptionInterface {
	humanPerception?: SRTContentHumanPerceptionInterface | undefined;
}

export interface RobotDetailTransitPointStartedInterface {
	transitPointStarted?: SRTContentTransitPointStartedInterface | undefined;
}
