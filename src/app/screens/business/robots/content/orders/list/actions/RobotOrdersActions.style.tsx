import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../services';

export const RobotOrdersActionsStyle = makeStyles(() => ({
	sSpeedDial: {
		position: 'fixed',
		bottom: 25
	},
	sSpeedDialIcon: {
		color: AppConfigService.AppOptions.colors.c7
	}
}));
