import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const RobotsActionsStyle = makeStyles((theme: Theme) => ({
	sActions: {
		marginBottom: theme.spacing(0.1),
		padding: theme.spacing(0, 2)
	},
	sCreate: {
		padding: `${theme.spacing(1)} 0`
	}
}));
