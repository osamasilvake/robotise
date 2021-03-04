import { makeStyles, Theme } from '@material-ui/core';

import { ConfigService } from '../../services';

const drawerWidth = ConfigService.AppOptions.drawer.width;
export const privateLayoutStyles = makeStyles((theme: Theme) => ({
	privateLayoutContent: {
		marginTop: theme.spacing(8),
		padding: theme.spacing(1.5) + 3
	},
	privateLayoutContentOpen: {
		marginLeft: drawerWidth,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	privateLayoutContentClose: {
		marginLeft: theme.spacing(7) + 1,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	}
}));
