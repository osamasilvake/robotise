import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SitePhoneConfigsSMSMessagesStyle = makeStyles((theme: Theme) => ({
	sContainer: {
		marginTop: theme.spacing(3)
	},
	sExcerpt: {
		marginBottom: theme.spacing(1.5)
	},
	sButtonWrapper: {
		marginTop: theme.spacing(1),
		textAlign: 'right'
	}
}));
