import { alpha, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

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
