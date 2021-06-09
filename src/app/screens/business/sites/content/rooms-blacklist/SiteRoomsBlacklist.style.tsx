import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../services';

export const SiteRoomsBlacklistStyles = makeStyles((theme: Theme) => ({
	sBox: {
		marginTop: theme.spacing(2.5)
	},
	sFloorLabel: {
		marginBottom: theme.spacing(1)
	},
	sGridContainer: {
		marginBottom: theme.spacing(3)
	},
	sCardContent: {
		padding: theme.spacing(1)
	},
	sActive: {
		backgroundColor: AppConfigService.AppOptions.colors.c10v1,
		color: AppConfigService.AppOptions.colors.c7
	},
	sInactive: {
		backgroundColor: AppConfigService.AppOptions.colors.c12
	}
}));
