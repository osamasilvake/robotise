import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../services';

export const StatusStyles = makeStyles((theme: Theme) => ({
	sStatus: {
		borderRadius: theme.typography.pxToRem(2),
		color: AppConfigService.AppOptions.colors.c7,
		fontWeight: 400,
		padding: theme.spacing(0.4, 0.5),
		textTransform: 'capitalize'
	},
	sSmall: {
		fontSize: theme.typography.pxToRem(12)
	},
	sSuccessDark: {
		backgroundColor: AppConfigService.AppOptions.colors.c10
	},
	sSuccessLight: {
		backgroundColor: AppConfigService.AppOptions.colors.c10v1
	},
	sWarn: {
		backgroundColor: AppConfigService.AppOptions.colors.c11
	},
	sError: {
		backgroundColor: AppConfigService.AppOptions.colors.c12
	},
	sInit: {
		backgroundColor: AppConfigService.AppOptions.colors.c15
	}
}));
