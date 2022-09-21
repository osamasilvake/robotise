import { Dispatch, ReactNode, SetStateAction } from 'react';

import { SRTContentDataInterface } from '../../../../../../slices/business/robots/RobotTwins.slice.interface';
import {
	RobotDetailRemoteSafetyResetButtonTypeEnum,
	RobotDetailRemoteSafetyResetEventsTypeEnum
} from './RobotDetailRemoteSafetyReset.enum';

export interface RobotDetailRemoteSafetyResetInterface {
	robotTwins: SRTContentDataInterface;
}

export interface RobotDetailRemoteSafetyResetButtonInterface {
	robotId: string;
	buttonClass: RobotDetailRemoteSafetyResetButtonTypeEnum;
	event: RobotDetailRemoteSafetyResetEventsTypeEnum;
	holdConfirm?: boolean;
	setHoldConfirm: Dispatch<SetStateAction<boolean>>;
	disabled?: boolean;
	children: ReactNode;
}

export interface RobotDetailRemoteSafetyResetOptionsInterface {
	event: string;
	buttonPressed: boolean;
}
