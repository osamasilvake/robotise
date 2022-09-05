import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../services';

export const RobotConfigurationEmergencyStyle = makeStyles((theme: Theme) => ({
	sCard: {
		borderTop: `${theme.typography.pxToRem(3)} solid transparent`
	},
	sCardActive: {
		borderTop: `${theme.typography.pxToRem(3)} solid ${AppConfigService.AppOptions.colors.c12}`,
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c12, 0.15)
	},
	sBox: {
		marginTop: theme.spacing(2)
	},
	sNote: {
		marginTop: theme.spacing(1)
	}
}));
