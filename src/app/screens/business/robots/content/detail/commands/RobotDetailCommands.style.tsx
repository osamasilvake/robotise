import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../../services';

export const RobotDetailCommandsStyles = makeStyles((theme: Theme) => ({
	sCommandsContainer: {
		marginTop: theme.spacing(4)
	},
	sCommandsControlLabel: {
		display: 'flex'
	},
	sCommandsControlTitle: {
		marginBottom: theme.spacing(1.5)
	},
	sCommandsControlLoading: {
		margin: theme.spacing(0.4, 0, 0, 1.5)
	},
	sCommandsControlChips: {
		marginLeft: theme.spacing(1)
	},
	sCommandsControlChipError: {
		backgroundColor: AppConfigService.AppOptions.colors.c12,
		color: AppConfigService.AppOptions.colors.c7,
		marginRight: theme.spacing(0.5)
	},
	sCommandsMuteTitle: {
		margin: theme.spacing(2, 0, 1)
	},
	sCommandsActionTitle: {
		margin: theme.spacing(2, 0)
	},
	sCommandsActionTranslateBox: {
		marginTop: theme.spacing(2)
	},
	sCommandsActionSelect: {
		minWidth: theme.typography.pxToRem(150)
	},
	sCommandsActionButton: {
		height: theme.typography.pxToRem(56),
		marginLeft: theme.spacing(1.5)
	}
}));
