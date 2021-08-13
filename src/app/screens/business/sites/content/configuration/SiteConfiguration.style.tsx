import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const SiteConfigurationStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(3)
	},
	sGridMarginBottom: {
		marginBottom: theme.spacing(3),
		[theme.breakpoints.down('md')]: {
			marginBottom: theme.spacing(1)
		}
	}
}));
