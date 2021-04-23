import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../../../../services';

export const RobotDetailStatesStyles = makeStyles((theme: Theme) => ({
	sStateContainer: {
		marginTop: theme.spacing(4)
	},
	sStateTitle: {
		marginBottom: theme.spacing(1)
	},
	sCardContent: {
		position: 'relative'
	},
	sCardContentIcon: {
		color: AppConfigService.AppOptions.colors.c13,
		position: 'absolute',
		right: theme.spacing(0.5),
		top: theme.spacing(0.5)
	},
	sCardContentValue: {
		margin: theme.spacing(1, 0)
	}
}));
