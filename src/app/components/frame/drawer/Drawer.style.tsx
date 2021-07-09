import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../services';

const drawerOpenWidth = AppConfigService.AppOptions.components.drawer.openWidth;
const drawerCloseWidth = AppConfigService.AppOptions.components.drawer.closeWidth;
export const DrawerStyle = makeStyles((theme: Theme) => ({
	sDrawer: {
		flexShrink: 0,
		whiteSpace: 'nowrap',
		width: theme.typography.pxToRem(drawerOpenWidth)
	},
	sOpen: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		width: theme.typography.pxToRem(drawerOpenWidth)
	},
	sClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.typography.pxToRem(drawerCloseWidth)
	},
	sListRoot: {
		height: '100%',
		overflowX: 'hidden',
		overflowY: 'auto'
	},
	sListItemWithSubtitle: {
		padding: theme.spacing(0, 2)
	},
	sListItem: {
		padding: theme.spacing(1, 2)
	},
	sBottomArea: {
		alignItems: 'center',
		display: 'flex',
		height: 48,
		justifyContent: 'center'
	}
}));
