import { makeStyles, Theme } from '@material-ui/core';

import { ConfigService } from '../../services';

const drawerWidth = ConfigService.AppOptions.drawer.width;
export const appBarStyles = makeStyles((theme: Theme) => ({
	appBar: {
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		zIndex: theme.zIndex.drawer + 1
	},
	appBarOpen: {
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		width: `calc(100% - ${drawerWidth}px)`
	},
	appBarToolbar: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: theme.spacing(0, 2)
	},
	appBarAccountButtonBox: {
		margin: theme.spacing(0, 1, 0, 0),
		textAlign: 'right'
	},
	appBarAccountButtonBoxSubtitle: {
		marginTop: theme.spacing(-0.25)
	}
}));
