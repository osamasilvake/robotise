import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const RobotOrderHeadStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginBottom: theme.spacing(2.5)
	},
	sRoomWrapper: {
		position: 'relative'
	},
	sRoom: {
		fontWeight: 500,
		marginLeft: theme.spacing(2)
	},
	sDebug: {
		position: 'absolute',
		left: 0,
		marginLeft: theme.spacing(10),
		top: -10
	},
	sItems: {
		padding: `0 ${theme.spacing(1)}`
	},
	sItem: {
		margin: `0 ${theme.spacing(1)}`
	}
}));
