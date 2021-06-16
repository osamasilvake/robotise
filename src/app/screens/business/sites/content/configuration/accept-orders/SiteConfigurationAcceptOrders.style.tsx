import { makeStyles, Theme } from '@material-ui/core/styles';

export const SiteConfigurationAcceptOrdersStyle = makeStyles((theme: Theme) => ({
	sContent: {
		position: 'relative'
	},
	sLoader: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1)
	},
	sBox: {
		marginTop: theme.spacing(2)
	}
}));
