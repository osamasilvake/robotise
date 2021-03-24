import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../../../../services';

export const RobotContentDetailGeneralStyles = makeStyles((theme: Theme) => ({
	sGridContainer: {
		marginTop: theme.spacing(2)
	},
	sGridItemStatusCaption: {
		display: 'block'
	},
	sGridItemStatus: {
		borderRadius: theme.typography.pxToRem(2),
		color: AppConfigService.AppVariables.colors.c7,
		display: 'inline-block',
		padding: theme.spacing(0.2, 0.6, 0)
	},
	sGridItemStatusOn: {
		backgroundColor: AppConfigService.AppVariables.colors.c10
	},
	sGridItemStatusOff: {
		backgroundColor: AppConfigService.AppVariables.colors.c12
	},
	sGridLastItem: {
		textAlign: 'right',
		[theme.breakpoints.down('sm')]: {
			textAlign: 'left'
		}
	},
	sGridLastItemLabelStatus: {
		display: 'block',
		fontWeight: 600,
		marginTop: theme.spacing(-0.5)
	},
	sGridLastItemLabelStatusOn: {
		color: AppConfigService.AppVariables.colors.c10
	},
	sGridLastItemLabelStatusOff: {
		color: AppConfigService.AppVariables.colors.c12
	},
	sGridLastItemCheckboxControl: {
		alignItems: 'flex-start',
		margin: 0
	}
}));
