import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SitePhoneConfigsDetailActionsStyle = makeStyles((theme: Theme) => ({
	sActions: {
		marginBottom: theme.spacing(2),
		padding: theme.spacing(1, 2)
	},
	sSipTitle: {
		fontWeight: 500,
		margin: `${theme.spacing(0.8)} 0 ${theme.spacing(0.6)}`
	}
}));
