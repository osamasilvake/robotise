import { makeStyles, Theme } from '@material-ui/core/styles';

export const RobotDetailGeneralStyles = makeStyles((theme: Theme) => ({
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
	},
	sGeneralLastItemCheckboxControl: {
		alignItems: 'flex-start',
		margin: 0
	}
}));
