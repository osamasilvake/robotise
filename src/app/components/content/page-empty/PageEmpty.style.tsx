import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const PageEmptyStyle = makeStyles((theme: Theme) => ({
	sBox: {
		paddingTop: theme.spacing(11)
	},
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
