import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../services';

export const RobotDetailInformationStyle = makeStyles((theme: Theme) => ({
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
