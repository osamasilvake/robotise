import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const PageEmptyStyle = makeStyles((theme: Theme) => ({
	sStack: {
		padding: theme.spacing(14, 2, 2, 2),
		textAlign: 'center'
	},
	sStackPadding: {
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
	}
}));
