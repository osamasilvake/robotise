import { Dispatch, SetStateAction } from 'react';

import { SliceRobotCloudConfigurationInterface } from '../../../../../../../slices/business/robots/configuration/cloud/RobotCloudConfiguration.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

export interface RobotConfigurationEmergencyInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robotCloudConfiguration: SliceRobotCloudConfigurationInterface;
}

export interface DialogEmergencyInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robotCloudConfiguration: SliceRobotCloudConfigurationInterface;
}
