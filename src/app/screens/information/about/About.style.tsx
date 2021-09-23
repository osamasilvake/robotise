import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const AboutStyle = makeStyles((theme: Theme) => ({
	sMediaGrid: {
		[theme.breakpoints.down('md')]: {
			marginTop: theme.typography.pxToRem(15)
		}
	},
	sMediaCard: {
		border: 'none',
		height: '100%'
	}
}));
