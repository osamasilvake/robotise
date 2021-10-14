import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SiteDetailGeneralStyle = makeStyles((theme: Theme) => ({
	sGeneralLastItem: {
		textAlign: 'right',
		[theme.breakpoints.down('lg')]: {
			textAlign: 'left'
		}
	}
}));
