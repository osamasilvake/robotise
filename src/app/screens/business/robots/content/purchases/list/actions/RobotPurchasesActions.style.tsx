import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../services';

export const RobotPurchasesActionsStyle = makeStyles((theme: Theme) => ({
	sActions: {
		marginBottom: theme.spacing(0.1),
		padding: theme.spacing(0, 2),
		position: 'sticky',
		top: 0,
		zIndex: AppConfigService.AppOptions.styles.zIndex.level3
	},
	sSpeedDial: {
		position: 'fixed',
		bottom: 25
	},
	sSpeedDialIcon: {
		color: AppConfigService.AppOptions.colors.c7
	}
}));
