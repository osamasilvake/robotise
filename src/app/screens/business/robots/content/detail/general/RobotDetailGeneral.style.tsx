import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const RobotDetailGeneralStyle = makeStyles((theme: Theme) => ({
	sGridItemBlock: {
		display: 'block'
	},
	sGridItemFlex: {
		alignItems: 'center',
		display: 'flex'
	},
	sGridItemInfoIcon: {
		cursor: 'help',
		marginLeft: theme.spacing(0.5)
	},
	sGridLastRowItem: {
		textAlign: 'right',
		[theme.breakpoints.down('lg')]: {
			textAlign: 'left'
		}
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
