import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const RobotDetailGeneralStyle = makeStyles((theme: Theme) => ({
	sGridItemInfoIcon: {
		cursor: 'help',
		marginLeft: theme.spacing(0.5)
	},
	sNoteGrid: {
		position: 'relative'
	},
	sNoteEditIconButton: {
		left: theme.spacing(5),
		position: 'absolute',
		top: theme.spacing(0.5)
	},
	sNoteEditIcon: {
		fontSize: theme.spacing(2)
	}
}));
