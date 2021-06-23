import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../services';

const drawerOpenWidth = AppConfigService.AppOptions.components.drawer.openWidth;
const drawerCloseWidth = AppConfigService.AppOptions.components.drawer.closeWidth;
export const PrivateLayoutStyle = makeStyles((theme: Theme) => ({
	sContentOpen: {
		marginLeft: theme.typography.pxToRem(drawerOpenWidth),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	sContentClose: {
		marginLeft: theme.typography.pxToRem(drawerCloseWidth),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	}
}));
