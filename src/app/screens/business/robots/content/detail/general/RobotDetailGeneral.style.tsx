import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const RobotDetailGeneralStyle = makeStyles((theme: Theme) => ({
	sGeneralItemLabel: {
		display: 'block'
	},
	sGeneralLastRowItem: {
		textAlign: 'right',
		[theme.breakpoints.down('lg')]: {
			textAlign: 'left'
		}
	}
}));
