import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const RobotConfigStyle = makeStyles((theme: Theme) => ({
	sExcerpt: {
		marginBottom: theme.spacing(3)
	},
	sFormHelperText: {
		margin: 0
	},
	sSubmit: {
		marginTop: theme.spacing(1)
	}
}));
