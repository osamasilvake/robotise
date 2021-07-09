import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const SiteNotificationsStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(3)
	},
	sNotificationTitle: {
		marginBottom: theme.spacing(1)
	},
	sListItemHead: {
		padding: theme.spacing(3)
	},
	sAddUser: {
		marginTop: theme.spacing(1)
	}
}));
