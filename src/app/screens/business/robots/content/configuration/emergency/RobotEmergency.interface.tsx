import { Dispatch, SetStateAction } from 'react';

import { SliceRobotOperationsInterface } from '../../../../../../slices/business/robots/RobotOperations.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

export interface RobotEmergencyInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robotOperations: SliceRobotOperationsInterface;
}

export interface DialogEmergencyInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robotOperations: SliceRobotOperationsInterface;
}
