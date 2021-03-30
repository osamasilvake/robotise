import { makeStyles, Theme } from '@material-ui/core';

export const RobotContentDetailGeneralStyles = makeStyles((theme: Theme) => ({
	sGeneralContainer: {
		marginTop: theme.spacing(2)
	},
	sGeneralItemStatusLabel: {
		display: 'block'
	},
	sGeneralLastItem: {
		textAlign: 'right',
		[theme.breakpoints.down('md')]: {
			textAlign: 'left'
		}
	},
	sGeneralLastItemLabel: {
		marginBottom: theme.spacing(-0.5)
	},
	sGeneralLastItemCheckboxControl: {
		alignItems: 'flex-start',
		margin: 0
	}
}));
