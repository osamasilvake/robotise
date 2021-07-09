import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const RobotDetailGeneralStyle = makeStyles((theme: Theme) => ({
	sGeneralItemStatusLabel: {
		display: 'block'
	},
	sGeneralLastItem: {
		textAlign: 'right',
		[theme.breakpoints.down('lg')]: {
			textAlign: 'left'
		}
	},
	sGeneralLastItemLabel: {
		display: 'block'
	}
}));
