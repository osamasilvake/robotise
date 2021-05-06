import { makeStyles, Theme } from '@material-ui/core/styles';

export const RobotDetailGeneralStyles = makeStyles((theme: Theme) => ({
	sGeneralContainer: {
		marginTop: theme.spacing(2)
	},
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
