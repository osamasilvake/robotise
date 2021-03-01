import { makeStyles, Theme } from '@material-ui/core';

import { ConfigService } from '../../services';

const drawerWidth = ConfigService.AppOptions.drawer.width;
export const headerStyles = makeStyles((theme: Theme) => ({
	appBar: {
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		zIndex: theme.zIndex.drawer + 1
	},
	appBarShift: {
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		width: `calc(100% - ${drawerWidth}px)`
	},
	appBarToolbar: {
		padding: theme.spacing(0, 2)
	},
	appBarIconHide: {
		display: 'none'
	}
}));
