import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../../services';

export const RobotDetailStatesStyles = makeStyles((theme: Theme) => ({
	sStatesContainer: {
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
