import { makeStyles, Theme } from '@material-ui/core/styles';

export const PictureStyles = makeStyles((theme: Theme) => ({
	sImage: {
		display: 'block',
		margin: '0 auto'
	},
	sFallback: {
		margin: `0 auto`,
		width: theme.typography.pxToRem(40)
	}
}));
