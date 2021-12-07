import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../services';

const drawerOpenWidth = AppConfigService.AppOptions.components.drawer.openWidth;
const drawerCloseWidth = AppConfigService.AppOptions.components.drawer.closeWidth;
const iconMinWidth = AppConfigService.AppOptions.components.drawer.iconMinWidth;
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
	sListItemIcon: {
		minWidth: theme.typography.pxToRem(iconMinWidth)
	},
	sListItemHint: {
		padding: theme.spacing(0, 2)
	}
}));
