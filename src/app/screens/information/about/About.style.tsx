import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

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
