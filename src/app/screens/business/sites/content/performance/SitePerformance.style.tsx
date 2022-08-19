import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SitePerformanceStyle = makeStyles((theme: Theme) => ({
	sBox: {
		margin: `${theme.spacing(4)} ${theme.spacing(-2)} 0`
	},
	sContentTop: {
		marginBottom: theme.spacing(-2),
		padding: `0 ${theme.spacing(2)}`
	},
	sPrint: {
		padding: theme.spacing(2)
	},
	sContentBottom: {
		marginTop: theme.spacing(-2),
		padding: `0 ${theme.spacing(2)}`
	},
	sDownload: {
		marginTop: theme.spacing(2)
	}
}));
