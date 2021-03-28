import { makeStyles, Theme } from '@material-ui/core';

export const RobotContentDetailGeneralStyles = makeStyles((theme: Theme) => ({
	sGridContainer: {
		marginTop: theme.spacing(2)
	},
	sGridItemStatusCaption: {
		display: 'block'
	},
	sGridLastItem: {
		textAlign: 'right',
		[theme.breakpoints.down('md')]: {
			textAlign: 'left'
		}
	},
	sGridLastItemLabel: {
		marginBottom: theme.spacing(-0.5)
	},
	sGridLastItemCheckboxControl: {
		alignItems: 'flex-start',
		margin: 0
	}
}));
