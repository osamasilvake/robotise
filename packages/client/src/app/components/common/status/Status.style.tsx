import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../services';

export const StatusStyles = makeStyles((theme: Theme) => ({
	sStatus: {
		borderRadius: theme.typography.pxToRem(2),
		color: AppConfigService.AppOptions.colors.c7,
		padding: theme.spacing(0.2, 0.4),
		textTransform: 'capitalize'
	},
	sStatusSmall: {
		fontSize: theme.typography.pxToRem(12)
	},
	sStatusSuccess: {
		backgroundColor: AppConfigService.AppOptions.colors.c10
	},
	sStatusWarning: {
		backgroundColor: AppConfigService.AppOptions.colors.c14
	},
	sStatusError: {
		backgroundColor: AppConfigService.AppOptions.colors.c12
	}
}));
