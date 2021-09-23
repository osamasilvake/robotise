import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const Error404Style = makeStyles((theme: Theme) => ({
	sTitle: {
		fontSize: theme.typography.pxToRem(75)
	},
	sDescription: {
		fontSize: theme.typography.pxToRem(20),
		lineHeight: 1.2,
		margin: `0 auto ${theme.spacing(1.5)}`,
		maxWidth: 500
	}
}));
