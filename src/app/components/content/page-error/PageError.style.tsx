import { makeStyles, Theme } from '@material-ui/core/styles';

export const PageErrorStyles = makeStyles((theme: Theme) => ({
	sTitle: {
		fontSize: theme.typography.pxToRem(30),
		marginBottom: theme.spacing(1)
	},
	sDescription: {
		lineHeight: 1.2,
		margin: `0 auto ${theme.spacing(1)}`,
		maxWidth: 500
	},
	sLink: {
		cursor: 'pointer',
		fontSize: theme.typography.pxToRem(17)
	}
}));
