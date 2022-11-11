import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const SiteConfigurationNotificationsStyle = makeStyles((theme: Theme) => ({
	sCard: {
		position: 'relative'
	},
	sHeadBlock: {
		cursor: 'pointer'
	},
	sTitle: {
		paddingLeft: theme.spacing(2),
		paddingTop: theme.spacing(2)
	},
	sExcerpt: {
		paddingBottom: theme.spacing(2),
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
	sAddUser: {
		marginTop: theme.spacing(1)
	}
}));
