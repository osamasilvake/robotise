import { makeStyles, Theme } from '@material-ui/core';

export const pageErrorStyles = makeStyles((theme: Theme) => ({
	sTitle: {
		fontSize: theme.typography.pxToRem(30),
		margin: theme.spacing(0, 0, 1)
	},
	sDescription: {
		lineHeight: 1.2,
		margin: theme.spacing(0, 'auto', 1),
		maxWidth: 500
	}
}));
