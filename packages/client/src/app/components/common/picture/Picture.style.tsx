import { makeStyles, Theme } from '@material-ui/core';

export const PictureStyles = makeStyles((theme: Theme) => ({
	sPictureBox: {
		padding: theme.typography.pxToRem(20)
	},
	sPicture: {
		display: 'block',
		width: '100%'
	},
	sFallback: {
		margin: `0 auto`,
		width: theme.typography.pxToRem(40)
	}
}));
