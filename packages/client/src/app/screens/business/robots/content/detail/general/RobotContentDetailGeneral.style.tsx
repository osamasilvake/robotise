import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../../../../services';

export const robotContentDetailGeneralStyles = makeStyles((theme: Theme) => ({
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
	sGridLastItemCheckboxControl: {
		margin: 0
	}
}));
