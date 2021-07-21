import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const SiteNotificationsStyle = makeStyles((theme: Theme) => ({
	sNotificationTitle: {
		marginTop: theme.spacing(2),
		paddingLeft: theme.spacing(2)
	},
	sNotificationsExcerpt: {
		marginBottom: theme.spacing(2),
		paddingLeft: theme.spacing(2)
	},
	sListItemHead: {
		padding: theme.spacing(3)
	},
	sAddUser: {
		marginTop: theme.spacing(1)
	}
}));
