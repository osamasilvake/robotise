import { makeStyles, Theme } from '@material-ui/core/styles';

export const AboutStyles = makeStyles((theme: Theme) => ({
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
