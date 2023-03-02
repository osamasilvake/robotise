import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const RobotConfigurationRobotStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(3)
	},
	sExcerpt: {
		marginBottom: theme.spacing(1.5)
	},
	sAction: {
		margin: `${theme.spacing(1)} 0 ${theme.spacing(2)}`
	},
	sBlock: {
		width: '100%'
	},
	sTitle: {
		fontWeight: 500,
		marginTop: theme.spacing(0.5)
	},
	sSelect: {
		marginTop: theme.spacing(1.25)
	},
	sInput: {
		marginTop: theme.spacing(1.25)
	},
	sSubmit: {
		marginTop: theme.spacing(1.25)
	},
	sSubmitNote: {
		marginTop: theme.spacing(1.25)
	},
	sDialogContent: {
		overflow: 'visible'
	}
}));
