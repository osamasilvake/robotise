import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const PictureStyle = makeStyles((theme: Theme) => ({
	sImage: {
		display: 'block',
		margin: '0 auto'
	},
	sImageFallback: {
		padding: theme.spacing(0.8, 0)
	},
	sImageFullWidth: {
		width: '100%'
	}
}));
