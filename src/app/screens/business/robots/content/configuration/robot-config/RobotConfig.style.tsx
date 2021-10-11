import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const RobotConfigStyle = makeStyles((theme: Theme) => ({
	sExcerpt: {
		marginBottom: theme.spacing(2)
	},
	sForm: {
		marginTop: theme.spacing(3)
	},
	sFormControlBox: {
		marginTop: theme.spacing(1)
	},
	sFormHelperText: {
		margin: 0
	}
}));
