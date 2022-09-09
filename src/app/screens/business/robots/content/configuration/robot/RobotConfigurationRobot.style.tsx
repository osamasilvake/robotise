import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const RobotConfigurationRobotStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(3)
	},
	sExcerpt: {
		marginBottom: theme.spacing(1.5)
	},
	sRecursiveTitle: {
		fontWeight: 500,
		marginTop: theme.spacing(2)
	},
	sIntentElement: {
		marginLeft: theme.spacing(2),
		marginTop: 0
	},
	sAction: {
		marginLeft: theme.spacing(4),
		marginTop: theme.spacing(2)
	},
	sRecursiveTitleInner: {
		fontWeight: 500,
		marginTop: theme.spacing(2),
		paddingLeft: theme.spacing(2)
	},
	sIntentElementInner: {
		marginTop: theme.spacing(-1.5),
		marginLeft: 0
	},
	sInput: {
		marginTop: theme.spacing(1)
	},
	sSubmit: {
		marginTop: theme.spacing(1)
	},
	sSubmitNote: {
		marginTop: theme.spacing(1)
	}
}));
