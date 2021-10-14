import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SitePhoneConfigsGeneralStyle = makeStyles((theme: Theme) => ({
	sGridItemFlex: {
		alignItems: 'center',
		display: 'flex'
	},
	sGridItemInfoIcon: {
		cursor: 'help',
		marginLeft: theme.spacing(0.5)
	}
}));
