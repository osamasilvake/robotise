import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const CardStyle = makeStyles((theme: Theme) => ({
	sCardContent0: {
		padding: 0,
		'&:last-child': {
			paddingBottom: 0
		}
	},
	sCardContent1: {
		padding: theme.typography.pxToRem(10),
		'&:last-child': {
			paddingBottom: theme.typography.pxToRem(10)
		}
	}
}));
