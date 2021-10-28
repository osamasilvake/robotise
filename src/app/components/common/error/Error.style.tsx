import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const ErrorStyle = makeStyles((theme: Theme) => ({
	sError: {
		textAlign: 'center'
	},
	sErrorPage: {
		padding: theme.spacing(14, 2, 2, 2)
	}
}));
