import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../services';

const drawerWidth = AppConfigService.AppOptions.components.drawer.width;
export const PrivateLayoutStyles = makeStyles((theme: Theme) => ({
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
