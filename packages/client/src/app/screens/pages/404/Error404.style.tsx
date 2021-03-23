import { makeStyles, Theme } from '@material-ui/core';

export const Error404Styles = makeStyles((theme: Theme) => ({
	sTitle: {
		fontSize: theme.typography.pxToRem(75)
	},
	sDescription: {
		fontSize: theme.typography.pxToRem(20),
		lineHeight: 1.2,
		margin: theme.spacing(0, 'auto', 1.5),
		maxWidth: 500
	},
	sLink: {
		fontSize: theme.typography.pxToRem(17)
	}
}));
