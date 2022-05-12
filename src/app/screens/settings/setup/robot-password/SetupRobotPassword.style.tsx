import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SetupRobotPasswordStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(3)
	},
	sExcerpt: {
		marginBottom: theme.spacing(1.5)
	},
	sSubmit: {
		marginTop: theme.spacing(1)
	}
}));
