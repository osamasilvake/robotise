import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../services';

export const StatusStyles = makeStyles((theme: Theme) => ({
	sStatus: {
		borderRadius: theme.typography.pxToRem(2),
		color: AppConfigService.AppVariables.colors.c7,
		padding: theme.spacing(0.2, 0.4),
		textTransform: 'capitalize'
	},
	sStatusSmall: {
		fontSize: theme.typography.pxToRem(12)
	},
	sStatusActive: {
		backgroundColor: AppConfigService.AppVariables.colors.c10
	},
	sStatusInActive: {
		backgroundColor: AppConfigService.AppVariables.colors.c12
	}
}));
