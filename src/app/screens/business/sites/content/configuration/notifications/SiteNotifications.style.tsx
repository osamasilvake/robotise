import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const SiteNotificationsStyle = makeStyles((theme: Theme) => ({
	sNotificationCard: {
		position: 'relative'
	},
	sTitle: {
		marginTop: theme.spacing(2),
		paddingLeft: theme.spacing(2)
	},
	sExcerpt: {
		marginBottom: theme.spacing(1),
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
