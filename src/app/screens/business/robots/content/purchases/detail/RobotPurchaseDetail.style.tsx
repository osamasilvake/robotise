import { alpha, makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../../services';

export const RobotPurchaseDetailStyles = makeStyles((theme: Theme) => ({
	sHeadBox: {
		margin: theme.spacing(2.5, 0, 1)
	},
	sHeadBilled: {
		marginBottom: theme.spacing(0.4)
	},
	sTableBody: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c10, 0.1)
	},
	sFootBox: {
		margin: theme.spacing(2.5, 0, 0)
	}
}));
