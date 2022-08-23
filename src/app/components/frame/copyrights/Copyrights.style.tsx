import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const CopyrightStyle = makeStyles((theme: Theme) => ({
	sCopyright: {
		height: 40
	},
	sFontSmall: {
		fontSize: theme.typography.pxToRem(12)
	}
}));
