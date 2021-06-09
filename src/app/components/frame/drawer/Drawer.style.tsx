import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../services';

const drawerWidth = AppConfigService.AppOptions.components.drawer.width;
export const DrawerStyles = makeStyles((theme: Theme) => ({
	sDrawer: {
		flexShrink: 0,
		whiteSpace: 'nowrap',
		width: theme.typography.pxToRem(drawerWidth)
	},
	sOpen: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		width: theme.typography.pxToRem(drawerWidth)
	},
	sClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing(7)
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
