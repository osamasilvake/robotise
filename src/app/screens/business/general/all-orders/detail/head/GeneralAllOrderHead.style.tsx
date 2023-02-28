import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const GeneralAllOrderHeadStyle = makeStyles((theme: Theme) => ({
	sBox: {
		marginBottom: theme.spacing(1.5)
	},
	sRoomWrapper: {
		marginLeft: theme.spacing(2),
		position: 'relative'
	},
	sRoom: {
		fontWeight: 500
	},
	sDebug: {
		position: 'absolute',
		left: 0,
		marginLeft: theme.spacing(8),
		top: -10
	},
	sItems: {
		padding: `0 ${theme.spacing(1)}`
	},
	sItem: {
		margin: `0 ${theme.spacing(1)}`
	}
}));
