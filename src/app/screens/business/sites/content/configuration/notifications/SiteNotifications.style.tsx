import { makeStyles, Theme } from '@material-ui/core/styles';

export const SiteNotificationsStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(3)
	},
	sNotificationTitle: {
		marginBottom: theme.spacing(1)
	},
	sListItemHead: {
		padding: theme.spacing(3)
	}
}));
