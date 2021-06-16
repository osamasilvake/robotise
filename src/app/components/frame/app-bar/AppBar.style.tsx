import { makeStyles, Theme } from '@material-ui/core/styles';

export const AppBarStyle = makeStyles((theme: Theme) => ({
	sLogoAndCloseIcon: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between',
		minHeight: theme.spacing(8),
		padding: theme.spacing(0, 0.5)
	},
	sLogoIcon: {
		width: '100%'
	},
	sAccountDetail: {
		margin: theme.spacing(0, 0, 0, 1),
		textAlign: 'left'
	},
	sAccountDetailSubtitle: {
		marginTop: theme.spacing(-0.25)
	},
	sListItem: {
		pointerEvents: 'none'
	}
}));
