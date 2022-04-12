import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../services';

export const SiteRoomsGridStyle = makeStyles((theme: Theme) => ({
	sFloor: {
		marginBottom: theme.spacing(1)
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
	sCheckbox: {
		height: '100%',
		position: 'absolute',
		right: theme.spacing(1.25),
		top: 0
	}
}));
