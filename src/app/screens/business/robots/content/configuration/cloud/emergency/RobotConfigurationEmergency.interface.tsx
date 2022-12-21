import { Dispatch, SetStateAction } from 'react';

import { SliceCloudConfigurationInterface } from '../../../../../../../slices/business/robots/configuration/cloud/CloudConfiguration.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

export interface RobotConfigurationEmergencyInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	cloudConfiguration: SliceCloudConfigurationInterface;
}

export interface DialogEmergencyInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	cloudConfiguration: SliceCloudConfigurationInterface;
}
