import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const RobotDetailGeneralStyle = makeStyles((theme: Theme) => ({
	sGeneralItemBlock: {
		display: 'block'
	},
	sGeneralItemFlex: {
		alignItems: 'center',
		display: 'flex'
	},
	sGeneralItemInfoIcon: {
		cursor: 'help',
		marginLeft: theme.spacing(0.5)
	},
	sGeneralLastRowItem: {
		textAlign: 'right',
		[theme.breakpoints.down('lg')]: {
			textAlign: 'left'
		}
	}
}));
