import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SitePerformanceStyle = makeStyles((theme: Theme) => ({
	sBox: {
		margin: `${theme.spacing(3)} ${theme.spacing(-2)} ${theme.spacing(-2)}`
	},
	sContentTop: {
		padding: `0 ${theme.spacing(2)}`
	},
	sPrint: {
		padding: theme.spacing(2)
	}
}));
