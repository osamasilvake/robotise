import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const LanguageStyle = makeStyles((theme: Theme) => ({
	sSubHeader: {
		lineHeight: theme.typography.pxToRem(32)
	},
	sFlag: {
		height: theme.typography.pxToRem(16),
		marginRight: theme.spacing(1),
		width: theme.typography.pxToRem(16)
	}
}));
