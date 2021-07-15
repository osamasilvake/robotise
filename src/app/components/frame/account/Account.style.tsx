import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const AccountStyle = makeStyles((theme: Theme) => ({
	sLogoAndCloseIcon: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between',
		minHeight: theme.spacing(8),
		padding: theme.spacing(0, 1)
	},
	sLogoIcon: {
		width: '100%'
	},
	sAccountButton: {
		borderRadius: theme.typography.pxToRem(2)
	},
	sAccountDetail: {
		margin: theme.spacing(0, 0, 0, 1),
		textAlign: 'left'
	},
	sAccountDetailSubtitle: {
		marginTop: theme.spacing(-0.25)
	}
}));
