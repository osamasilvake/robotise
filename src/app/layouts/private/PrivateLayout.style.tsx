import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../services';

const drawerWidth = AppConfigService.AppOptions.components.drawer.width;
export const PrivateLayoutStyles = makeStyles((theme: Theme) => ({
	sContent: {
		marginTop: theme.spacing(8)
	},
	sContentOpen: {
		marginLeft: theme.typography.pxToRem(drawerWidth),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	sContentClose: {
		marginLeft: theme.spacing(7),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	}
}));
