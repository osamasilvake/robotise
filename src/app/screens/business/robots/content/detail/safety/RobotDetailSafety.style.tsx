import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../../services';

export const RobotDetailSafetyStyles = makeStyles((theme: Theme) => ({
	sStateContainer: {
		marginTop: theme.spacing(4)
	},
	sSafetyTable: {
		marginTop: theme.spacing(1)
	},
	sSafetyActive: {
		color: AppConfigService.AppOptions.colors.c10v1,
		fontWeight: 500
	},
	sSafetyInactive: {
		color: AppConfigService.AppOptions.colors.c12,
		fontWeight: 500
	}
}));
