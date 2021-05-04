import { makeStyles, Theme } from '@material-ui/core/styles';

export const Error404Styles = makeStyles((theme: Theme) => ({
	sTitle: {
		fontSize: theme.typography.pxToRem(75)
	},
	sDescription: {
		fontSize: theme.typography.pxToRem(20),
		lineHeight: 1.2,
		margin: `0 auto ${theme.spacing(1.5)}`,
		maxWidth: 500
	},
	sLink: {
		cursor: 'pointer',
		fontSize: theme.typography.pxToRem(17)
	}
}));
