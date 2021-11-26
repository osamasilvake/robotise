import {
	ExternalLinkCallbackResponseInterface,
	ExternalLinkPayloadInterface
} from '../../../../../../components/common/external-link/ExternalLink.interface';
import {
	SRTContentActivityStateInterface,
	SRTContentBatteryStateInterface,
	SRTContentDataInterface,
	SRTContentDockingStateInterface,
	SRTContentJoystickStateInterface
} from '../../../../../../slices/business/robots/RobotTwins.slice.interface';

export interface RobotDetailStatesInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailStateInterface {
	robotTwins: SRTContentDataInterface;
	state: RobotDetailStateInfoInterface;
}

export interface RobotDetailStateInfoInterface {
	title: string;
	type: string;
	content:
		| SRTContentBatteryStateInterface
		| SRTContentDockingStateInterface
		| SRTContentJoystickStateInterface
		| SRTContentActivityStateInterface
		| undefined;
}

export interface RobotDetailStateCardInterface {
	title: string;
	item: {
		title: string | undefined;
		value: string | undefined;
		date: string | undefined;
		icon?: string | undefined;
	};
}
