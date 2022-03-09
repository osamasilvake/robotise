import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SiteConfigStyle = makeStyles((theme: Theme) => ({
	sExcerpt: {
		marginBottom: theme.spacing(1.5)
	},
	sFormHelperText: {
		marginTop: theme.spacing(0.5)
	},
	sSubmit: {
		marginTop: theme.spacing(1)
	}
}));
