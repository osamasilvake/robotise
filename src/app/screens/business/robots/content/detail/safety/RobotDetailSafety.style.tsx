import { alpha, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../../../../services';

export const RobotDetailSafetyStyle = makeStyles((theme: Theme) => ({
	sStateContainer: {
		marginTop: theme.spacing(4)
	},
	sGridContainer: {
		marginTop: theme.spacing(0.5)
	},
	sList: {
		padding: 0
	},
	sListItemWarning: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c11, 0.15)
	}
}));
