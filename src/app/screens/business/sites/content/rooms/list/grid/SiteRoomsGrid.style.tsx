import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../services';

export const SiteRoomsGridStyle = makeStyles((theme: Theme) => ({
	sFloor: {
		marginBottom: theme.spacing(1)
	},
	sFloorIcon: {
		marginLeft: theme.spacing(0.5)
	},
	sGridContainer: {
		marginBottom: theme.spacing(3)
	},
	sCardContent: {
		position: 'relative'
	},
	sActive: {
		backgroundColor: AppConfigService.AppOptions.colors.c10v1,
		color: AppConfigService.AppOptions.colors.c7
	},
	sInactive: {
		backgroundColor: AppConfigService.AppOptions.colors.c12
	},
	sQRCodeIcon: {
		fontSize: theme.typography.pxToRem(18),
		marginLeft: theme.spacing(0.5)
	},
	sBlockRight: {
		textAlign: 'right'
	},
	sQRChip: {
		visibility: 'hidden'
	},
	sCheckboxControl: {
		marginLeft: 0,
		marginRight: 0,
		marginTop: theme.spacing(1)
	},
	sCheckbox: {
		padding: 0
	},
	sCheckboxLabel: {
		marginRight: theme.spacing(0.5)
	},
	sButtons: {
		marginTop: theme.spacing(1.5)
	},
	sButtonGap: {
		margin: `${theme.spacing(1)} 0`
	}
}));
