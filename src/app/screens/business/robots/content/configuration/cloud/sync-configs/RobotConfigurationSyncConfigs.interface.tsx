import { Dispatch, SetStateAction } from 'react';

import { RobotConfigurationSyncConfigsTypeEnum } from './RobotConfigurationSyncConfigs.enum';

export interface RobotConfigurationSyncConfigsDialog {
	status: boolean;
	type: RobotConfigurationSyncConfigsTypeEnum;
}

export interface DialogSyncConfirmationInterface {
	open: RobotConfigurationSyncConfigsDialog;
	setOpen: Dispatch<SetStateAction<RobotConfigurationSyncConfigsDialog>>;
}
