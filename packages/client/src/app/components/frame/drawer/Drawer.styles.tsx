import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../services';

const drawerWidth = AppConfigService.AppOptions.components.drawer.width;
export const drawerStyles = makeStyles((theme: Theme) => ({
	sDrawer: {
		flexShrink: 0,
		whiteSpace: 'nowrap',
		width: drawerWidth
	},
	sOpen: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		width: drawerWidth
	},
	sClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing(7)
	},
	sToolbar: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between',
		minHeight: theme.spacing(8),
		paddingLeft: theme.spacing(2)
	},
	sAvatar: {
		width: theme.spacing(15)
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
	sBottom: {
		alignItems: 'center',
		display: 'flex',
		height: 48,
		justifyContent: 'center'
	}
}));
