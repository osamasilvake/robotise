import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../../../../services';

export const RobotContentDetailStatesStyles = makeStyles((theme: Theme) => ({
	sStateContainer: {
		marginTop: theme.spacing(4)
	},
	sStateTitle: {
		marginBottom: theme.spacing(2)
	},
	sStateCardContent: {
		position: 'relative'
	},
	sStateCardContentIcon: {
		color: AppConfigService.AppVariables.colors.c8a,
		fontSize: theme.spacing(4),
		position: 'absolute',
		right: theme.spacing(0.5),
		top: theme.spacing(0.5)
	},
	sStateCardContentValue: {
		margin: theme.spacing(1, 0)
	}
}));
