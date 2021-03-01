import { makeStyles, Theme } from '@material-ui/core';

export const privateLayoutStyles = makeStyles((theme: Theme) => ({
	privateLayoutRoot: {
		display: 'flex'
	},
	privateLayoutContent: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	privateLayoutContentShift: {
		marginLeft: 0,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	privateLayoutToolbar: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'flex-start',
		padding: theme.spacing(0, 2),
		...theme.mixins.toolbar // necessary for content to be below app bar
	}
}));
