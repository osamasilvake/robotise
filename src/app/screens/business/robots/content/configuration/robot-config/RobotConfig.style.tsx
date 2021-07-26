import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

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
