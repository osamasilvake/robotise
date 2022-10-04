import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SiteConfigurationServicePositionsStyle = makeStyles((theme: Theme) => ({
	sCard: {
		position: 'relative'
	},
	sTitle: {
		marginTop: theme.spacing(2),
		paddingLeft: theme.spacing(2)
	},
	sExcerpt: {
		marginBottom: theme.spacing(2),
		paddingLeft: theme.spacing(2)
	},
	sCreate: {
		position: 'absolute',
		right: theme.spacing(2),
		top: theme.spacing(0.5)
	},
	sListItemHead: {
		padding: theme.spacing(3)
	},
	sAddPosition: {
		marginTop: theme.spacing(1)
	}
}));
