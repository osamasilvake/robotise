import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const PageEmptyStyle = makeStyles((theme: Theme) => ({
	sStack: {
		padding: theme.spacing(14, 2, 2, 2),
		textAlign: 'center'
	},
	sStackPadding: {
		paddingTop: theme.spacing(11)
	}
}));
