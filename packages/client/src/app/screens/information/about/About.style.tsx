import { makeStyles, Theme } from '@material-ui/core';

export const AboutStyles = makeStyles((theme: Theme) => ({
	sMediaGrid: {
		[theme.breakpoints.down('sm')]: {
			marginTop: theme.typography.pxToRem(15)
		}
	},
	sMediaCard: {
		border: 'none',
		height: '100%'
	}
}));
