import { makeStyles, Theme } from '@material-ui/core/styles';

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
	sCommandsMuteTitle: {
		margin: theme.spacing(2, 0, 1)
	},
	sCommandsActionTitle: {
		margin: theme.spacing(2, 0)
	},
	sCommandsActionTranslateBox: {
		marginTop: theme.spacing(2)
	},
	sCommandsActionRotateSelect: {
		minWidth: theme.typography.pxToRem(150)
	},
	sCommandsActionRotateButton: {
		height: theme.typography.pxToRem(56),
		marginLeft: theme.spacing(2)
	},
	sCommandsActionTranslateSelect: {
		minWidth: theme.typography.pxToRem(150)
	},
	sCommandsActionTranslateButton: {
		height: theme.typography.pxToRem(56),
		marginLeft: theme.spacing(2)
	}
}));
