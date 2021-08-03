import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../../../../../services';

export const RobotPurchasesActionsStyle = makeStyles(() => ({
	sSpeedDial: {
		position: 'absolute',
		bottom: 0,
		left: 0
	},
	sSpeedDialIcon: {
		color: AppConfigService.AppOptions.colors.c7
	}
}));
