import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const RobotConfigurationStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(3)
	},
	sGridMarginBottom: {
		marginBottom: theme.spacing(3),
		[theme.breakpoints.down('md')]: {
			marginBottom: theme.spacing(1)
		}
	}
}));
