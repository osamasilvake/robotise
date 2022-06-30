import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const ThemeStyle = makeStyles((theme: Theme) => ({
	sSubHeader: {
		lineHeight: theme.typography.pxToRem(32)
	}
}));
