import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../services';

export const RobotsInventoryTableStyle = makeStyles((theme: Theme) => ({
	sTableContainer: {
		marginBottom: theme.spacing(5)
	},
	sImage: {
		height: theme.spacing(6),
		width: theme.spacing(6)
	},
	sImageBackground: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c15, 0.7)
	}
}));
