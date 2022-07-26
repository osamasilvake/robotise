import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../../services';

export const RobotTopProductsTableStyle = makeStyles((theme: Theme) => ({
	sImage: {
		height: theme.spacing(6),
		width: theme.spacing(6)
	},
	sImageBackground: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c15, 0.7)
	}
}));
