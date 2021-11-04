import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const RobotDetailCommandsStyle = makeStyles((theme: Theme) => ({
	sCommandsContainer: {
		marginTop: theme.spacing(4)
	},
	sCommandsControlTitle: {
		marginBottom: theme.spacing(1.5)
	},
	sCommandsControlLoading: {
		lineHeight: 0,
		marginLeft: theme.spacing(1.5)
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
