import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../../../services';

export const RobotsInventoryTableStyle = makeStyles((theme: Theme) => ({
	sTableContainer: {
		marginBottom: theme.spacing(5)
	},
	sImage: {
		height: theme.spacing(6),
		width: theme.spacing(6)
	},
	sImageBg: {
		backgroundColor: AppConfigService.AppOptions.colors.c13
	}
}));
