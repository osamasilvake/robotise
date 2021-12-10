import {
	SRTContentComputerInfoInterface,
	SRTContentDataInterface,
	SRTContentHumanPerceptionInterface,
	SRTContentSafetySensorsInterface,
	SRTContentSafetySystemsInterface,
	SRTContentTransitPointStartedInterface
} from '../../../../../../slices/business/robots/RobotTwins.slice.interface';
import { RobotDetailSafetyKeysTypeEnum } from './RobotDetailInformation.enum';

export interface RobotDetailInformationInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailSafetySystemsInterface {
	systems?: SRTContentSafetySystemsInterface | undefined;
	isDocked: boolean;
}

export interface RobotDetailSafetySensorsInterface {
	sensors?: SRTContentSafetySensorsInterface | undefined;
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

export interface RobotDetailSafetyMappedResultInterface {
	key: RobotDetailSafetyKeysTypeEnum;
	icon: string;
	label: string;
	msg1: string;
	msg2: string;
	value: boolean;
	opposite: boolean;
	warning: boolean;
}
