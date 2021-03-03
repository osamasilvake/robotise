import { makeStyles, Theme } from '@material-ui/core';

import { ConfigService } from '../../services';

const drawerWidth = ConfigService.AppOptions.drawer.width;
export const sidebarStyles = makeStyles((theme: Theme) => ({
	drawer: {
		flexShrink: 0,
		whiteSpace: 'nowrap',
		width: drawerWidth
	},
	drawerOpen: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		width: drawerWidth
	},
	drawerClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing(7) + 1
	},
	drawerAvatar: {
		width: theme.spacing(15)
	},
	drawerToolbar: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between',
		paddingLeft: theme.spacing(2),
		...theme.mixins.toolbar // necessary for content to be below app bar
	},
	ListItem: {
		padding: theme.spacing(0.7, 2)
	}
}));
